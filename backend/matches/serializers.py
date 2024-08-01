from __future__ import annotations

from typing import TYPE_CHECKING

from rest_framework import serializers

from matches.models import Match

if TYPE_CHECKING:
    from collections.abc import Mapping
    from typing import Any


class MatchSerializer(serializers.ModelSerializer[Match]):
    player1 = serializers.SerializerMethodField(read_only=True)
    player2 = serializers.SerializerMethodField(read_only=True)
    tournament_name = serializers.CharField(source="tournament.name", read_only=True)

    def get_player1(self, obj: Match) -> Mapping[str, Any]:
        return {
            "name": getattr(obj, "player1_full_name"),
            "sets_won": getattr(obj, "sets_won_by_player1_count") or 0,
        }

    def get_player2(self, obj: Match) -> Mapping[str, Any]:
        return {
            "name": getattr(obj, "player2_full_name"),
            "sets_won": getattr(obj, "sets_won_by_player2_count") or 0,
        }

    class Meta:
        model = Match
        fields = ("id", "player1", "player2", "date", "observation", "tournament_name")
        read_only_fields = fields
