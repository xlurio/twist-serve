from __future__ import annotations

import pathlib
import uuid
from typing import TYPE_CHECKING

from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from tournaments.choices import SurfaceChoices

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager

    from rounds.models import Round


def _get_tournament_avatar_dest_path(instance: Tournament, filename: str) -> str:
    uu1d = str(uuid.uuid4())
    new_filename = (str(instance.pk) or uu1d) + pathlib.Path(filename).suffix
    return f"tournaments/{new_filename}"


class Tournament(BaseModel):
    rounds: RelatedManager[Round]

    name = models.TextField(_("name"))
    avatar = models.ImageField(
        _("avatar"), upload_to=_get_tournament_avatar_dest_path, blank=True, null=True
    )
    country = models.TextField(_("country"))
    state_province = models.TextField(_("state/province"))
    city = models.TextField(_("city"))
    neighborhood = models.TextField(_("neighborhood"), null=True, blank=True)
    street = models.TextField(_("street"))
    building_number = models.PositiveIntegerField(
        _("building number"), null=True, blank=True
    )
    complement = models.TextField(_("complement"), null=True, blank=True)
    instalation = models.TextField(_("instalation"))
    start_date = models.DateField(_("start date"))
    end_date = models.DateField(_("end date"))
    surface = models.CharField(
        _("surface"), max_length=6, choices=SurfaceChoices.choices
    )

    @property
    def slots(self) -> int:
        first_round = self.rounds.order_by("-number_of_players").first()
        return first_round.number_of_players if first_round else 0

    class Meta:
        verbose_name = _("tournament")
        verbose_name_plural = _("tournaments")
        ordering = ("-start_date",)
