from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.apps import apps
from django.db import models

if TYPE_CHECKING:
    from matches.managers.match_game import MatchGameQuerySet
    from matches.models import MatchGame, MatchSet

    [MatchSet, MatchGame]  # pylint: disable=pointless-statement


class MatchSetQuerySetMixin:
    def annotate_sets_won_by_player1(self) -> MatchSetQuerySet:
        return cast(
            "MatchSetQuerySet",
            self.__annotate_games_won_by_each_player()
            .filter(
                games_won_by_player1_count__gt=models.F("games_won_by_player2_count")
            )
            .values("match")
            .annotate(sets_won_by_player1_count=models.Count("pk")),
        )

    def annotate_sets_won_by_player2(self) -> MatchSetQuerySet:
        return cast(
            "MatchSetQuerySet",
            self.__annotate_games_won_by_each_player()
            .filter(
                games_won_by_player2_count__gt=models.F("games_won_by_player1_count")
            )
            .values("match")
            .annotate(sets_won_by_player2_count=models.Count("pk")),
        )

    def __annotate_games_won_by_each_player(self) -> MatchSetQuerySet:
        games_won_by_player1_count_sq = models.Subquery(
            self.__get_games_won_by_player1_subquery()
        )
        games_won_by_player2_count_sq = models.Subquery(
            self.__get_games_won_by_player2_subquery()
        )

        return cast("MatchSetQuerySet", self).annotate(
            games_won_by_player1_count=games_won_by_player1_count_sq,
            games_won_by_player2_count=games_won_by_player2_count_sq,
        )

    def __get_games_won_by_player1_subquery(self) -> MatchGameQuerySet:
        games_won_by_player1_count = models.Count(
            "game_set", filter=models.Q(player1_points__gt=models.F("player2_points"))
        )
        return cast(
            "MatchGameQuerySet",
            self.MatchGameModel.objects.filter(game_set=models.OuterRef("pk"))
            .annotate(games_won_by_player1_count=games_won_by_player1_count)
            .values("games_won_by_player1_count")[:1],
        )

    def __get_games_won_by_player2_subquery(self) -> MatchGameQuerySet:
        games_won_by_player2_count = models.Count(
            "game_set", filter=models.Q(player2_points__gt=models.F("player1_points"))
        )
        return cast(
            "MatchGameQuerySet",
            self.MatchGameModel.objects.filter(game_set=models.OuterRef("pk"))
            .annotate(games_won_by_player2_count=games_won_by_player2_count)
            .values("games_won_by_player2_count")[:1],
        )

    @property
    def MatchGameModel(self) -> type[MatchGame]:  # pylint: disable=invalid-name
        return apps.get_model("matches", "MatchGame")


class MatchSetQuerySet(MatchSetQuerySetMixin, models.QuerySet["MatchSet"]): ...


class MatchSetManager(MatchSetQuerySetMixin, models.Manager["MatchSet"]):
    def get_queryset(self) -> MatchSetQuerySet:
        return MatchSetQuerySet(self.model)
