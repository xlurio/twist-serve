from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from matches.choices import PointChoices, WinnerChoices
from matches.querysets import MatchGameQuerySet, MatchQuerySet

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager


class MatchGame(BaseModel):
    position = models.PositiveIntegerField(
        _("position"), validators=[validators.MinValueValidator(1)]
    )
    player1_points = models.PositiveIntegerField(
        _("points won by the player 1"), choices=PointChoices.choices
    )
    player2_points = models.PositiveIntegerField(
        _("points won by the player 2"), choices=PointChoices.choices
    )
    game_set = models.ForeignKey(
        "matches.MatchSet",
        on_delete=models.RESTRICT,
        related_name="games",
        verbose_name=_("set"),
    )

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


MatchGame.objects = MatchGameQuerySet.as_manager()


class MatchSet(BaseModel):
    games: RelatedManager[MatchGame]

    position = models.PositiveIntegerField(_("position"))
    match = models.ForeignKey(
        "matches.Match",
        on_delete=models.RESTRICT,
        related_name="sets",
        verbose_name=_("set"),
    )

    def get_winner(self) -> WinnerChoices:
        return cast(
            MatchGameQuerySet, self.games.filter(is_active=True)
        ).get_match_set_winner(self)

    class Meta:
        verbose_name = _("set")
        verbose_name_plural = _("sets")
        constraints = (
            models.UniqueConstraint(
                fields=("position", "match"), name="unique_position_match"
            ),
        )


class Match(BaseModel):
    sets: RelatedManager[MatchSet]

    player1 = models.ForeignKey(
        "players.Player",
        on_delete=models.RESTRICT,
        related_name="matches_as_player1",
        verbose_name=_("player 1"),
    )
    player2 = models.ForeignKey(
        "players.Player",
        on_delete=models.RESTRICT,
        related_name="matches_as_player2",
        verbose_name=_("player 2"),
    )
    observation = models.TextField(_("observation"))
    date = models.DateField(_("date"))
    tournament = models.ForeignKey(
        "tournaments.Tournament",
        models.CASCADE,
        related_name="matches",
        verbose_name=_("tournament"),
    )

    class Meta:
        verbose_name = _("match")
        verbose_name_plural = _("matches")


Match.objects = MatchQuerySet.as_manager()
