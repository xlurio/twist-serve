from django.db import models
from django_filters.rest_framework import backends
from rest_framework import filters, generics

from tournaments.models import Tournament
from tournaments.serializers import TournamentSerializer


class TournamentListAPIView(generics.ListAPIView[Tournament]):
    queryset = Tournament.objects.filter(is_active=True).annotate(
        num_of_subscriptions=models.Count(
            "subscriptions", filter=models.Q(subscriptions__is_active=True)
        )
    )
    serializer_class = TournamentSerializer
    filter_backends = (backends.DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = {"start_date": ["gte"], "subscriptions__player": ["in"]}
    ordering_fields = ("num_of_subscriptions",)
