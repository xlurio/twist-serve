from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from matches.choices import MatchPlayerChoices, PointChoices
from matches.managers import MatchGameManager, MatchManager, MatchSetManager
from matches.managers.match2match_rel import Match2MatchRelationshipManager

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager

    from players.models import Player
    from rounds.models import Round


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
    def winner(self) -> MatchPlayerChoices:
        did_player1_won = self.player1_points > self.player2_points

        if did_player1_won:
            return MatchPlayerChoices.PLAYER_1

        return MatchPlayerChoices.PLAYER_2

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

    position = models.PositiveIntegerField(
        _("position"), validators=[validators.MinValueValidator(1)]
    )
    match = models.ForeignKey(
        "matches.Match",
        on_delete=models.RESTRICT,
        related_name="sets",
        verbose_name=_("set"),
    )

    objects = MatchSetManager()

    def get_winner(self) -> MatchPlayerChoices:
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
    next_match_relationships: RelatedManager[Match2MatchRelationship]
    previous_match_relationships: RelatedManager[Match2MatchRelationship]
    sets: RelatedManager[MatchSet]

    player1: models.ForeignKey[Player | None, Player | None] = models.ForeignKey(
        "players.Player",
        on_delete=models.RESTRICT,
        related_name="matches_as_player1",
        verbose_name=_("player 1"),
        null=True,
        blank=True,
    )
    player2: models.ForeignKey[Player | None, Player | None] = models.ForeignKey(
        "players.Player",
        on_delete=models.RESTRICT,
        related_name="matches_as_player2",
        verbose_name=_("player 2"),
        null=True,
        blank=True,
    )
    date = models.DateField(_("date"))
    observation = models.TextField(_("observation"), blank=True)
    match_round_id: int
    match_round: models.ForeignKey[Round, Round] = models.ForeignKey(
        "rounds.Round",
        models.RESTRICT,
        related_name="matches",
        verbose_name=_("round"),
    )

    objects = MatchManager()

    class Meta:
        verbose_name = _("match")
        verbose_name_plural = _("matches")
        ordering = ("-date",)


class Match2MatchRelationship(BaseModel):
    position = models.CharField(
        _("position"), max_length=8, choices=MatchPlayerChoices.choices
    )
    previous_match = models.ForeignKey(
        "matches.Match", models.CASCADE, related_name="next_match_relationships"
    )
    next_match = models.ForeignKey(
        "matches.Match", models.CASCADE, related_name="previous_match_relationships"
    )

    objects = Match2MatchRelationshipManager()

    class Meta:
        verbose_name = _("match")
        verbose_name_plural = _("matches")
        ordering = ("position",)
        constraints = [
            models.UniqueConstraint(
                fields=["position", "previous_match", "next_match"],
                name="unique_position_prev_next",
            )
        ]
