from __future__ import annotations

from typing import TYPE_CHECKING

from django.core import validators
from django.db import models
from django.utils import text
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from rounds.managers import RoundManager
from rounds.validators import EvenValidator

if TYPE_CHECKING:
    from collections.abc import Iterable

    from django.db.models.base import ModelBase
    from django.db.models.manager import RelatedManager

    from matches.models import Match
    from tournaments.models import Tournament


class Round(BaseModel):
    matches: RelatedManager[Match]

    FINALS = 2
    SEMIFINALS = 4
    QUARTERFINALS = 8

    slug = models.SlugField(_("slug"), blank=True)
    tournament_id: int
    tournament: models.ForeignKey[Tournament, Tournament] = models.ForeignKey(
        "tournaments.Tournament",
        models.CASCADE,
        related_name="rounds",
        verbose_name=_("tournament"),
    )
    number_of_players_validators = (validators.MinValueValidator(2), EvenValidator())
    number_of_players = models.PositiveIntegerField(
        _("number_of_players"), validators=number_of_players_validators
    )

    objects = RoundManager()

    @property
    def name(self) -> str:
        is_final_rounds = self.number_of_players <= self.QUARTERFINALS

        if is_final_rounds:
            return self.__get_name_for_final_rounds()

        return f"round of {self.number_of_players}"

    def __get_name_for_final_rounds(self) -> str:
        return {
            self.QUARTERFINALS: "quarterfinals",
            self.SEMIFINALS: "semifinals",
            self.FINALS: "finals",
        }.get(self.number_of_players, f"round of {self.number_of_players}")

    # pylint: disable-next=too-many-arguments, arguments-differ
    def save(
        self,
        force_insert: bool | tuple[ModelBase, ...] = False,
        force_update: bool = False,
        using: str | None = None,
        update_fields: Iterable[str] | None = None,
    ) -> None:
        will_num_of_players_be_updated = (
            "email" in update_fields if update_fields else update_fields is None
        )

        if will_num_of_players_be_updated:
            self.slug = text.slugify(self.name)

        return super().save(force_insert, force_update, using, update_fields)

    class Meta:
        verbose_name = _("round")
        verbose_name_plural = _("rounds")
        ordering = ("-number_of_players",)
        constraints = [
            models.UniqueConstraint(
                fields=["tournament", "number_of_players"],
                name="unique_tournament_players",
            )
        ]
