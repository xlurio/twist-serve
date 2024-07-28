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
    winner = models.ForeignKey(
        "players.Player",
        models.RESTRICT,
        related_name="titles",
        verbose_name=_("winner"),
        null=True,
    )
    start_date = models.DateField(_("start date"))

    class Meta:
        verbose_name = _("tournament")
        verbose_name_plural = _("tournaments")
