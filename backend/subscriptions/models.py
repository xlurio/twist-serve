from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel


class Subscription(BaseModel):
    player = models.ForeignKey(
        "players.Player",
        models.CASCADE,
        related_name="subscriptions",
        verbose_name=_("player"),
    )
    tournament = models.ForeignKey(
        "tournaments.Tournament",
        models.CASCADE,
        related_name="subscriptions",
        verbose_name=_("tournament"),
    )

    class Meta:
        verbose_name = _("subscription")
        verbose_name_plural = _("subscriptions")
        constraints = (
            models.UniqueConstraint(
                fields=["player", "tournament"], name="unique_player_tournament"
            ),
        )
