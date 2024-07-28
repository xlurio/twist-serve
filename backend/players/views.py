from __future__ import annotations

from typing import TYPE_CHECKING, cast

from rest_framework import mixins, viewsets

from players.models import Player
from players.serializers import (
    PlayerReadSerializer,
    PlayerWriteSerializer,
)

if TYPE_CHECKING:
    from collections.abc import Mapping

    from rest_framework.serializers import BaseSerializer


class PlayerViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet[Player]
):
    queryset = Player.objects.filter(is_active=True)
    serializer_class = PlayerReadSerializer
    lookup_url_kwarg = "player_id"

    def get_serializer_class(self) -> type[BaseSerializer[Player]]:
        return cast(
            "Mapping[str, type[BaseSerializer[Player]]]",
            {"create": PlayerWriteSerializer},
        ).get(self.action, self.serializer_class)
