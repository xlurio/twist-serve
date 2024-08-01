from __future__ import annotations

import pathlib
import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel


def _get_tournament_avatar_dest_path(instance: Tournament, filename: str) -> str:
    uu1d = str(uuid.uuid4())
    new_filename = (str(instance.pk) or uu1d) + pathlib.Path(filename).suffix
    return f"tournaments/{new_filename}"


class Tournament(BaseModel):
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
    winner = models.ForeignKey(
        "players.Player",
        models.RESTRICT,
        related_name="titles",
        verbose_name=_("winner"),
        null=True,
    )
    start_date = models.DateField(_("start date"))
    end_date = models.DateField(_("end date"))

    class Meta:
        verbose_name = _("tournament")
        verbose_name_plural = _("tournaments")
        ordering = ("-start_date",)
