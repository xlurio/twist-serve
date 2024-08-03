from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django_filters.rest_framework import backends
from rest_framework import generics

from matches.filtersets import MatchFilterSet
from matches.models import Match
from matches.serializers import MatchSerializer

if TYPE_CHECKING:
    from matches.managers.match import MatchQuerySet


class MatchListAPIView(generics.ListAPIView[Match]):
    queryset = (
        cast("MatchQuerySet", Match.objects.filter(is_active=True))
        .annotate_players_full_name()
        .annotate_sets_won_by_each_player_count()
        .annotate_previous_match_for_each_player()
    )
    serializer_class = MatchSerializer
    filter_backends = [backends.DjangoFilterBackend]
    filterset_class = MatchFilterSet
