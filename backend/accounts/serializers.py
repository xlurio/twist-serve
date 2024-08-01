from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.contrib.auth import get_user_model
from rest_framework import serializers

if TYPE_CHECKING:
    from collections.abc import Mapping
    from typing import Any

    from accounts.managers import UserManager
    from accounts.models import User


class UserWriteSerializer(serializers.ModelSerializer["User"]):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data: Mapping[str, Any]) -> User:
        return cast("UserManager", get_user_model().objects).create_user(
            **validated_data
        )

    def update(self, instance: User, validated_data: Mapping[str, Any]) -> User:
        validated_data_copy = dict(validated_data)
        password = validated_data_copy.pop("password", None)

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.set_password(password)
        instance.clean()
        instance.save()

        return instance

    class Meta:
        model = get_user_model()
        fields = ("first_name", "last_name", "email", "password")


class UserReadSerializer(serializers.ModelSerializer["User"]):
    player_avatar = serializers.ImageField(source="player.avatar")

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "player",
            "player_avatar",
        )
        read_only_fields = fields
