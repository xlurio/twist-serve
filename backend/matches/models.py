from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from matches.choices import PointChoices, WinnerChoices
from matches.managers import MatchGameManager, MatchManager, MatchSetManager

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager

    from players.models import Player


class MatchGame(BaseModel):
    position = models.PositiveIntegerField(
        _("position"), validators=[validators.MinValueValidator(1)]
    )
    player1_points = models.PositiveSmallIntegerField(
        _("points won by the player 1"), choices=PointChoices.choices
    )
    player2_points = models.PositiveSmallIntegerField(
        _("points won by the player 2"), choices=PointChoices.choices
    )
    game_set = models.ForeignKey(
        "matches.MatchSet",
        on_delete=models.RESTRICT,
        related_name="games",
        verbose_name=_("set"),
    )

    objects = MatchGameManager()

    @property
    def winner(self) -> WinnerChoices:
        did_player1_won = self.player1_points > self.player2_points

        if did_player1_won:
            return WinnerChoices.PLAYER_1

        return WinnerChoices.PLAYER_2

    class Meta:
        verbose_name = _("game")
        verbose_name_plural = _("games")
        constraints = (
            models.UniqueConstraint(
                fields=("position", "game_set"), name="unique_position_set"
            ),
        )


class MatchSet(BaseModel):
    games: RelatedManager[MatchGame]

    position = models.PositiveIntegerField(_("position"))
    match = models.ForeignKey(
        "matches.Match",
        on_delete=models.RESTRICT,
        related_name="sets",
        verbose_name=_("set"),
    )

    objects = MatchSetManager()

    def get_winner(self) -> WinnerChoices:
        return cast(
            MatchGameManager, self.games.filter(is_active=True)
        ).get_match_set_winner(self)

    class Meta:
        verbose_name = _("set")
        verbose_name_plural = _("sets")
        constraints = [
            models.UniqueConstraint(
                fields=("position", "match"), name="unique_position_match"
            )
        ]


class Match(BaseModel):
    sets: RelatedManager[MatchSet]

    player1: models.ForeignKey[Player] = models.ForeignKey(
        "players.Player",
        on_delete=models.RESTRICT,
        related_name="matches_as_player1",
        verbose_name=_("player 1"),
    )
    player2: models.ForeignKey[Player] = models.ForeignKey(
        "players.Player",
        on_delete=models.RESTRICT,
        related_name="matches_as_player2",
        verbose_name=_("player 2"),
    )
    date = models.DateField(_("date"))
    observation = models.TextField(_("observation"))
    tournament = models.ForeignKey(
        "tournaments.Tournament",
        models.CASCADE,
        related_name="matches",
        verbose_name=_("tournament"),
    )

    objects = MatchManager()

    @property
    def sets_won_by_player1(self) -> int:
        return cast("MatchSetManager", self.sets).count_won_by_player1()

    @property
    def sets_won_by_player2(self) -> int:
        return cast("MatchSetManager", self.sets).count_won_by_player2()

    class Meta:
        verbose_name = _("match")
        verbose_name_plural = _("matches")
        ordering = ("-date",)
