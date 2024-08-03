from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.db import models
from django_filters.rest_framework import backends
from rest_framework import filters, mixins, viewsets

from tournaments.models import Tournament
from tournaments.serializers import (
    TournamentDetailSerializer,
    TournamentSerializer,
)

if TYPE_CHECKING:
    from collections.abc import Mapping

    from rest_framework.serializers import BaseSerializer


class TournamentViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet[Tournament],
):
    queryset = Tournament.objects.filter(is_active=True).annotate(
        num_of_subscriptions=models.Count(
            "subscriptions", filter=models.Q(subscriptions__is_active=True)
        )
    )
    serializer_class = TournamentSerializer
    filter_backends = (backends.DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = {"start_date": ["gte"], "subscriptions__player": ["in"]}
    ordering_fields = ("num_of_subscriptions",)

    def get_serializer_class(self) -> type[BaseSerializer[Tournament]]:
        return cast(
            "Mapping[str, type[BaseSerializer[Tournament]]]",
            {"retrieve": TournamentDetailSerializer},
        ).get(self.action, self.serializer_class)
