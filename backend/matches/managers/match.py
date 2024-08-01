from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.apps import apps
from django.db import models
from django.db.models import functions

if TYPE_CHECKING:
    from matches.models import Match, MatchGame, MatchSet
    from players.models import Player

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

    def annotate_sets_won_by_players_count(self) -> MatchQuerySet:
        games_won_by_player1_count = models.Count(
            "game_set", filter=models.Q(player1_points__gt=models.F("player2_points"))
        )
        games_won_by_player2_count = models.Count(
            "game_set", filter=models.Q(player2_points__gt=models.F("player1_points"))
        )

        games_won_by_player1 = (
            self.MatchGameModel.objects.filter(game_set=models.OuterRef("pk"))
            .annotate(games_won_by_player1_count=games_won_by_player1_count)
            .values("games_won_by_player1_count")[:1]
        )

        games_won_by_player2 = (
            self.MatchGameModel.objects.filter(game_set=models.OuterRef("pk"))
            .annotate(games_won_by_player2_count=games_won_by_player2_count)
            .values("games_won_by_player2_count")[:1]
        )

        sets_with_games_won = self.MatchSetModel.objects.annotate(
            games_won_by_player1_count=models.Subquery(games_won_by_player1),
            games_won_by_player2_count=models.Subquery(games_won_by_player2),
        )

        sets_won_by_player1 = (
            sets_with_games_won.filter(
                games_won_by_player1_count__gt=models.F("games_won_by_player2_count")
            )
            .values("match")
            .annotate(sets_won_by_player1_count=models.Count("pk"))
        )

        sets_won_by_player2 = (
            sets_with_games_won.filter(
                games_won_by_player2_count__gt=models.F("games_won_by_player1_count")
            )
            .values("match")
            .annotate(sets_won_by_player2_count=models.Count("pk"))
        )

        queryset = cast("MatchQuerySet", self).annotate(
            sets_won_by_player1_count=models.Subquery(
                sets_won_by_player1.filter(match=models.OuterRef("pk")).values(
                    "sets_won_by_player1_count"
                )[:1]
            ),
            sets_won_by_player2_count=models.Subquery(
                sets_won_by_player2.filter(match=models.OuterRef("pk")).values(
                    "sets_won_by_player2_count"
                )[:1]
            ),
        )

        return queryset

    def get_number_of_wins_for_player(self, player: Player) -> int:
        matches_with_winner = (
            cast("MatchQuerySet", self)
            .annotate_sets_won_by_players_count()
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
            .annotate_sets_won_by_players_count()
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

    @property
    def MatchGameModel(self) -> type[MatchGame]:  # pylint: disable=invalid-name
        return apps.get_model("matches", "MatchGame")

    @property
    def MatchSetModel(self) -> type[MatchSet]:  # pylint: disable=invalid-name
        return apps.get_model("matches", "MatchSet")


class MatchQuerySet(MatchQuerySetMixin, models.QuerySet["Match"]): ...


class MatchManager(MatchQuerySetMixin, models.Manager["Match"]):
    def get_queryset(self) -> models.QuerySet[Match]:
        return MatchQuerySet(self.model)
