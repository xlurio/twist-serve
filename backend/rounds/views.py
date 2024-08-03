from __future__ import annotations

from django_filters.rest_framework import backends
from rest_framework import generics

from rounds.models import Round
from rounds.serializers import RoundSerializer


class RoundListAPIView(generics.ListAPIView[Round]):
    queryset = Round.objects.filter(is_active=True)
    serializer_class = RoundSerializer
    filter_backends = [backends.DjangoFilterBackend]
    filterset_fields = ["tournament"]
