from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.db import models

if TYPE_CHECKING:
    from rounds.models import Round
    from tournaments.models import Tournament


class RoundQuerySetMixin:
    def create_rounds_for_tournament(self, tournament: Tournament, slots: int) -> None:
        rounds_to_create = []
        power = 1
        number_of_players = 2

        while number_of_players <= slots:
            rounds_to_create.append(
                cast("RoundQuerySet", self).model(
                    number_of_players=number_of_players, tournament=tournament
                )
            )
            power += 1
            number_of_players = 2**power

        cast("RoundQuerySet", self).bulk_create(rounds_to_create)


class RoundQuerySet(RoundQuerySetMixin, models.QuerySet["Round"]): ...


class RoundManager(RoundQuerySetMixin, models.Manager["Round"]):
    def get_queryset(self) -> models.QuerySet[Round]:
        return RoundQuerySet(self.model)
