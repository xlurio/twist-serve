from __future__ import annotations

import datetime
import math
from typing import TYPE_CHECKING, cast

from django.apps import apps
from django.db import models
from django.db.models import functions

from matches.choices import MatchPlayerChoices

if TYPE_CHECKING:
    from collections.abc import Iterable, Sequence

    from matches.managers.match_set import MatchSetQuerySet
    from matches.models import Match, Match2MatchRelationship, MatchGame, MatchSet
    from players.models import Player
    from rounds.models import Round

    [MatchGame, Match]  # pylint: disable=pointless-statement


class MatchQuerySetMixin:
    def annotate_players_full_name(self) -> MatchQuerySet:
        return cast("MatchQuerySet", self).annotate(
            player1_full_name=functions.Concat(
                models.F("player1__user__first_name"),
                models.Value(" "),
                models.F("player1__user__last_name"),
            ),
            player2_full_name=functions.Concat(
                models.F("player2__user__first_name"),
                models.Value(" "),
                models.F("player2__user__last_name"),
            ),
        )

    def annotate_previous_match_for_each_player(self) -> MatchQuerySet:
        return self.annotate_player1_previous_match().annotate_player2_previous_match()

    def annotate_player1_previous_match(self) -> MatchQuerySet:
        player1_previous_match = self.Match2MatchRelationshipModel.objects.filter(
            next_match_id=models.OuterRef("pk"), position=MatchPlayerChoices.PLAYER_1
        ).values_list("previous_match_id")[:1]
        return cast("MatchQuerySet", self).annotate(
            player1_previous_match=models.Subquery(player1_previous_match)
        )

    def annotate_player2_previous_match(self) -> MatchQuerySet:
        player2_previous_match = self.Match2MatchRelationshipModel.objects.filter(
            next_match_id=models.OuterRef("pk"), position=MatchPlayerChoices.PLAYER_2
        ).values_list("previous_match_id")[:1]
        return cast("MatchQuerySet", self).annotate(
            player2_previous_match=models.Subquery(player2_previous_match)
        )

    def annotate_sets_won_by_each_player_count(self) -> MatchQuerySet:
        sets_won_by_player1_count = (
            cast("MatchSetQuerySet", self.MatchSetModel.objects)
            .annotate_sets_won_by_player1()
            .filter(match=models.OuterRef("pk"))
            .values("sets_won_by_player1_count")[:1]
        )
        sets_won_by_player2_count = (
            cast("MatchSetQuerySet", self.MatchSetModel.objects)
            .annotate_sets_won_by_player2()
            .filter(match=models.OuterRef("pk"))
            .values("sets_won_by_player2_count")[:1]
        )

        queryset = cast("MatchQuerySet", self).annotate(
            sets_won_by_player1_count=models.Subquery(sets_won_by_player1_count),
            sets_won_by_player2_count=models.Subquery(sets_won_by_player2_count),
        )

        return queryset

    def get_number_of_wins_for_player(self, player: Player) -> int:
        matches_with_winner = (
            cast("MatchQuerySet", self)
            .annotate_sets_won_by_each_player_count()
            .annotate(
                winner=models.Case(
                    models.When(
                        sets_won_by_player1__gt=models.F("sets_won_by_player2_count"),
                        then=models.F("player1_id"),
                    ),
                    models.When(
                        sets_won_by_player2_count__gt=models.F("sets_won_by_player1"),
                        then=models.F("player2_id"),
                    ),
                    output_field=models.IntegerField(),
                )
            )
        )

        return matches_with_winner.filter(winner=player.pk).count()

    def get_number_of_losses_for_player(self, player: Player) -> int:
        matches_with_loser = (
            cast("MatchQuerySet", self)
            .annotate_sets_won_by_each_player_count()
            .annotate(
                loser=models.Case(
                    models.When(
                        sets_won_by_player1__lt=models.F("sets_won_by_player2_count"),
                        then=models.F("player1_id"),
                    ),
                    models.When(
                        sets_won_by_player2_count__lt=models.F("sets_won_by_player1"),
                        then=models.F("player2_id"),
                    ),
                    output_field=models.IntegerField(),
                )
            )
        )

        return matches_with_loser.filter(loser=player.pk).count()

    def create_matches_for_rounds(self, rounds: Iterable[Round]) -> MatchQuerySet:
        matches_to_create: list[Match] = []

        for round_idx, match_round in enumerate(rounds):
            matches_to_create.extend(
                self.__make_matches_for_round(round_idx, match_round)
            )

        cast("MatchQuerySet", self).bulk_create(matches_to_create)

    def __make_matches_for_round(
        self, match_round_idx: int, match_round: Round
    ) -> Sequence[Match]:
        matches_to_create = []

        for _ in range(0, match_round.number_of_players, 2):
            current_day = match_round.tournament.start_date + datetime.timedelta(
                math.floor(match_round_idx / 8)
            )
            matches_to_create.append(
                cast("MatchQuerySet", self).model(
                    date=current_day, match_round=match_round
                )
            )

        return matches_to_create

    @property
    def MatchSetModel(self) -> type[MatchSet]:  # pylint: disable=invalid-name
        return apps.get_model("matches", "MatchSet")

    @property
    def Match2MatchRelationshipModel(  # pylint: disable=invalid-name
        self,
    ) -> type[Match2MatchRelationship]:
        return apps.get_model("matches", "Match2MatchRelationship")


class MatchQuerySet(MatchQuerySetMixin, models.QuerySet["Match"]): ...


class MatchManager(MatchQuerySetMixin, models.Manager["Match"]):
    def get_queryset(self) -> models.QuerySet[Match]:
        return MatchQuerySet(self.model)
