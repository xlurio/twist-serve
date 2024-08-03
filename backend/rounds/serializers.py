from rest_framework import serializers

from rounds.models import Round


class RoundSerializer(serializers.ModelSerializer[Round]):
    class Meta:
        model = Round
        fields = ("id", "slug", "name")
