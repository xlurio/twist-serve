import django_filters

from matches.filters import PlayerFilter
from matches.models import Match
from players.models import Player


class MatchFilterSet(django_filters.FilterSet):
    player = PlayerFilter(queryset=Player.objects.filter(is_active=True))

    class Meta:
        model = Match
        fields = ("player", "match_round")
