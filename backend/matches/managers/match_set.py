from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models

if TYPE_CHECKING:
    from matches.models import MatchSet

    [MatchSet]  # pylint: disable=pointless-statement


class MatchSetQuerySetMixin:
    def count_won_by_player1(self: MatchSetQuerySet) -> int:
        return (
            self.annotate(
                won_by_player1_count=models.Count(
                    "games",
                    filter=models.Q(
                        games__player1_points__gt=models.F("games__player2_points")
                    ),
                ),
                won_by_player2_count=models.Count(
                    "games",
                    filter=models.Q(
                        games__player2_points__gt=models.F("games__player1_points")
                    ),
                ),
            )
            .filter(won_by_player1_count__gt=models.F("won_by_player2_count"))
            .count()
        )

    def count_won_by_player2(self: MatchSetQuerySet) -> int:
        return (
            self.annotate(
                won_by_player2_count=models.Count(
                    "games",
                    filter=models.Q(
                        games__player2_points__gt=models.F("games__player1_points")
                    ),
                ),
                won_by_player1_count=models.Count(
                    "games",
                    filter=models.Q(
                        games__player1_points__gt=models.F("games__player2_points")
                    ),
                ),
            )
            .filter(won_by_player2_count__gt=models.F("won_by_player1_count"))
            .count()
        )


class MatchSetQuerySet(MatchSetQuerySetMixin, models.QuerySet["MatchSet"]): ...


class MatchSetManager(MatchSetQuerySetMixin, models.Manager["MatchSet"]):
    def get_queryset(self) -> MatchSetQuerySet:
        return MatchSetQuerySet(self.model)
