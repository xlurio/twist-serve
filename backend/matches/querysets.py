from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models

from matches.choices import WinnerChoices

if TYPE_CHECKING:
    from matches.models import Match, MatchGame, MatchSet
    from players.models import Player

    [MatchGame, Match]  # pylint: disable=pointless-statement


class MatchGameQuerySet(models.QuerySet["MatchGame"]):
    def get_match_set_winner(self, match_set: MatchSet) -> WinnerChoices:
        player1_wins_filter = models.Q(player1_points__gt=models.F("player2_points"))
        player2_wins_filter = models.Q(player2_points__gt=models.F("player1_points"))
        set_result = self.filter(game_set=match_set).aggregate(
            player1_wins=models.Count("pk", filter=player1_wins_filter),
            player2_wins=models.Count("pk", filter=player2_wins_filter),
        )

        did_player1_won = set_result["player1_wins"] > set_result["player2_wins"]

        if did_player1_won:
            return WinnerChoices.PLAYER_1

        return WinnerChoices.PLAYER_2


class MatchQuerySet(models.QuerySet["Match"]):
    def get_number_of_wins_for_player(self, player: Player) -> int:
        sets_won_by_player1 = models.Count(
            "sets",
            filter=models.Q(
                sets__games__player1_points__gt=models.F("sets__games__player2_points")
            ),
        )
        sets_won_by_player2 = models.Count(
            "sets",
            filter=models.Q(
                sets__games__player2_points__gt=models.F("sets__games__player1_points")
            ),
        )

        matches_with_winner = self.annotate(
            player1_set_wins=sets_won_by_player1,
            player2_set_wins=sets_won_by_player2,
        ).annotate(
            winner=models.Case(
                models.When(
                    player1_set_wins__gt=models.F("player2_set_wins"),
                    then=models.F("player1_id"),
                ),
                models.When(
                    player2_set_wins__gt=models.F("player1_set_wins"),
                    then=models.F("player2_id"),
                ),
                output_field=models.IntegerField(),
            )
        )

        return matches_with_winner.filter(winner=player.pk).count()

    def get_number_of_losses_for_player(self, player: Player) -> int:
        sets_won_by_player1 = models.Count(
            "sets",
            filter=models.Q(
                sets__games__player1_points__gt=models.F("sets__games__player2_points")
            ),
        )
        sets_won_by_player2 = models.Count(
            "sets",
            filter=models.Q(
                sets__games__player2_points__gt=models.F("sets__games__player1_points")
            ),
        )

        matches_with_loser = self.annotate(
            player1_set_wins=sets_won_by_player1,
            player2_set_wins=sets_won_by_player2,
        ).annotate(
            loser=models.Case(
                models.When(
                    player1_set_wins__lt=models.F("player2_set_wins"),
                    then=models.F("player1_id"),
                ),
                models.When(
                    player2_set_wins__lt=models.F("player1_set_wins"),
                    then=models.F("player2_id"),
                ),
                output_field=models.IntegerField(),
            )
        )

        return matches_with_loser.filter(loser=player.pk).count()
