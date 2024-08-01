from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models
from django_filters import filters

from matches.managers.match import MatchQuerySet

if TYPE_CHECKING:
    from players.models import Player


class PlayerFilter(filters.ModelChoiceFilter):
    def filter(self, qs: MatchQuerySet, value: Player | None) -> MatchQuerySet:
        if value in filters.EMPTY_VALUES:
            return qs

        return self.__filter_by_value(qs, value)

    def __filter_by_value(
        self, qs: MatchQuerySet, value: Player | None
    ) -> MatchQuerySet:
        if self.distinct:
            qs = qs.distinct()
        qs = self.get_method(qs)(models.Q(player1=value) | models.Q(player2=value))
        return qs
