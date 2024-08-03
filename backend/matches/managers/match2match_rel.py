from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.apps import apps
from django.db import models

from matches.choices import MatchPlayerChoices

if TYPE_CHECKING:
    from collections.abc import Sequence

    from matches.models import Match, Match2MatchRelationship
    from rounds.models import Round


class Match2MatchRelationshipQuerySetMixin:
    def create_relationships_between_rounds(
        self, rounds: models.QuerySet[Round]
    ) -> None:
        round_matches_qs = self.MatchModel.objects.filter(
            is_active=True, match_round__in=rounds
        )
        rels_to_create: list[Match2MatchRelationship] = []

        for round1, round2 in self.__make_pairs_of_rounds(rounds):
            round1_matches_qs = [
                match for match in round_matches_qs if match.match_round_id == round1.pk
            ]
            round1_pairs_of_matches = self.__make_pairs_of_matches_for_round_matches(
                round1_matches_qs
            )
            round2_matches_qs = [
                match for match in round_matches_qs if match.match_round_id == round2.pk
            ]
            rels_to_create.extend(
                self.__make_relationships_between_pair_of_matches_and_matches(
                    round1_pairs_of_matches, round2_matches_qs
                )
            )

        cast("Match2MatchRelationshipQuerySet", self).bulk_create(rels_to_create)

    def __make_pairs_of_rounds(
        self, rounds: models.QuerySet[Round]
    ) -> list[tuple[Round, Round]]:
        round_pairs: list[tuple[Round, Round]] = []

        for index in range(1, rounds.count()):
            round_pairs.append((rounds[index - 1], rounds[index]))

        return round_pairs

    def __make_pairs_of_matches_for_round_matches(
        self, round_matches: Sequence[Match]
    ) -> list[tuple[Match, Match]]:
        round_matches_pairs = []

        for index in range(0, len(round_matches), 2):
            round_matches_pairs.append((round_matches[index], round_matches[index + 1]))

        return round_matches_pairs

    def __make_relationships_between_pair_of_matches_and_matches(
        self, pairs_of_matches: Sequence[tuple[Match, Match]], matches: Sequence[Match]
    ) -> Sequence[Match2MatchRelationship]:
        rels_to_create = []

        for (round1_match1, round1_match2), round2_match in zip(
            pairs_of_matches, matches, strict=False
        ):
            rels_to_create.append(
                cast("Match2MatchRelationshipQuerySet", self).model(
                    position=MatchPlayerChoices.PLAYER_1,
                    previous_match=round1_match1,
                    next_match=round2_match,
                )
            )
            rels_to_create.append(
                cast("Match2MatchRelationshipQuerySet", self).model(
                    position=MatchPlayerChoices.PLAYER_2,
                    previous_match=round1_match2,
                    next_match=round2_match,
                )
            )

        return rels_to_create

    @property
    def MatchModel(self) -> type[Match]:  # pylint: disable=invalid-name
        return apps.get_model("matches", "Match")


class Match2MatchRelationshipQuerySet(
    Match2MatchRelationshipQuerySetMixin, models.QuerySet["Match2MatchRelationship"]
): ...


class Match2MatchRelationshipManager(
    Match2MatchRelationshipQuerySetMixin, models.Manager["Match2MatchRelationship"]
):
    def get_queryset(self) -> models.QuerySet[Match2MatchRelationship]:
        return Match2MatchRelationshipQuerySet(self.model)
