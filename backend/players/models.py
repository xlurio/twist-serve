from __future__ import annotations

import pathlib
import uuid
from typing import TYPE_CHECKING, cast

from django.apps import apps
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from players.choices import BackhandChoices, BestHandChoices

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager

    from matches.models import Match
    from matches.querysets import MatchQuerySet
    from tournaments.models import Tournament


def _get_player_avatar_dest_path(instance: Player, filename: str) -> str:
    uu1d = str(uuid.uuid4())
    new_filename = (str(instance.pk) or uu1d) + pathlib.Path(filename).suffix
    return f"players/{new_filename}"


class Player(BaseModel):
    matches_as_player1: RelatedManager[Match]
    matches_as_player2: RelatedManager[Match]
    titles: RelatedManager[Tournament]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="player",
        verbose_name=_("user"),
        null=True,
    )
    avatar = models.ImageField(
        _("avatar"), upload_to=_get_player_avatar_dest_path, blank=True, null=True
    )
    date_of_birth = models.DateField(_("date of birth"))
    hometown_country = models.TextField(_("hometown country"))
    hometown_state_province = models.TextField(_("hometown state/province"))
    hometown_city = models.TextField(_("hometown city"))
    weight = models.IntegerField(
        _("weight (kg)"), help_text=_("player's weight in kilograms")
    )
    height = models.IntegerField(
        _("height (cm)"), help_text=_("player's height in centimeters")
    )
    best_hand = models.CharField(
        _("best hand"), max_length=13, choices=BestHandChoices.choices
    )
    backhand = models.CharField(
        _("backhand"), max_length=20, choices=BackhandChoices.choices
    )

    @property
    def wins(self) -> int:
        return cast(
            "MatchQuerySet", self.MatchModel.objects.filter(is_active=True)
        ).get_number_of_wins_for_player(self)

    @property
    def losses(self) -> int:
        return cast(
            "MatchQuerySet", self.MatchModel.objects.filter(is_active=True)
        ).get_number_of_losses_for_player(self)

    @property  # pylint: disable-next=invalid-name
    def MatchModel(self) -> type[Match]:
        return apps.get_model("matches", "Match")

    @property
    def num_of_titles(self) -> int:
        return self.titles.count()

    @property
    def age(self) -> int:
        raw_age = (timezone.localdate() - self.date_of_birth).days / 365
        return round(raw_age)

    def __str__(self) -> str:
        return (
            f'{self.user.full_name} ({self.age}")'
            if self.user
            else f'Player {self.pk} ({self.age}")'
        )

    class Meta:
        verbose_name = _("player")
        verbose_name_plural = _("players")
