from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models

from matches.choices import MatchPlayerChoices

if TYPE_CHECKING:
    from matches.models import MatchGame, MatchSet

    [MatchGame, MatchSet]  # pylint: disable=pointless-statement


class MatchGameQuerySetMixin:
    def get_match_set_winner(
        self: MatchGameQuerySet, match_set: MatchSet
    ) -> MatchPlayerChoices:
        player1_wins_filter = models.Q(player1_points__gt=models.F("player2_points"))
        player2_wins_filter = models.Q(player2_points__gt=models.F("player1_points"))
        set_result = self.filter(game_set=match_set).aggregate(
            player1_wins=models.Count("pk", filter=player1_wins_filter),
            player2_wins=models.Count("pk", filter=player2_wins_filter),
        )

        did_player1_won = set_result["player1_wins"] > set_result["player2_wins"]

        if did_player1_won:
            return MatchPlayerChoices.PLAYER_1

        return MatchPlayerChoices.PLAYER_2


class MatchGameQuerySet(MatchGameQuerySetMixin, models.QuerySet["MatchGame"]): ...


class MatchGameManager(MatchGameQuerySetMixin, models.Manager["MatchGame"]):
    def get_queryset(self) -> models.QuerySet[MatchGame]:
        return MatchGameQuerySet(self.model)
