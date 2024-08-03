from rest_framework import serializers

from tournaments.models import Tournament


class TournamentSerializer(serializers.ModelSerializer[Tournament]):
    class Meta:
        model = Tournament
        fields = (
            "id",
            "name",
            "avatar",
            "start_date",
            "end_date",
            "country",
            "city",
        )
        read_only_fields = fields


class TournamentDetailSerializer(serializers.ModelSerializer[Tournament]):
    class Meta:
        model = Tournament
        fields = (
            "id",
            "name",
            "avatar",
            "start_date",
            "end_date",
            "country",
            "city",
            "surface",
            "slots",
        )
