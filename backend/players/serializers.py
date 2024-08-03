from __future__ import annotations

import pickle
from typing import TYPE_CHECKING

from django.contrib import auth
from django.db import models, transaction
from rest_framework import serializers

from accounts.serializers import UserWriteSerializer
from core.tasks import save_file_to_file_field
from players.models import Player

if TYPE_CHECKING:
    from collections.abc import Mapping, Sequence
    from typing import Any

    from django.core.files.uploadedfile import UploadedFile

    from accounts.models import User


class PlayerWriteSerializer(serializers.ModelSerializer[Player]):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email")
    password = serializers.CharField(source="user.password", write_only=True)
    instance: Player

    @transaction.atomic
    def save(self, **kwargs: Any) -> Player:
        self.__assert_to_be_able_to_save(kwargs)

        validated_data = {**self.validated_data, **kwargs}
        self.__update_or_create_user(self.instance, validated_data)

        if self.instance is not None:
            self.instance = self.update(self.instance, validated_data)
            assert (
                self.instance is not None
            ), "`update()` did not return an object instance."

        self.instance = self.create(validated_data)
        assert (
            self.instance is not None
        ), "`create()` did not return an object instance."

        return self.instance

    def __assert_to_be_able_to_save(self, kwargs: Mapping[str, Any]) -> None:
        assert hasattr(
            self, "_errors"
        ), "You must call `.is_valid()` before calling `.save()`."

        assert (
            not self.errors
        ), "You cannot call `.save()` on a serializer with invalid data."

        # Guard against incorrect use of `serializer.save(commit=False)`
        assert "commit" not in kwargs, (
            "'commit' is not a valid keyword argument to the 'save()' method. "
            "If you need to access data before committing to the database then "
            "inspect 'serializer.validated_data' instead. "
            "You can also pass additional keyword arguments to 'save()' if you "
            "need to set extra attributes on the saved model instance. "
            "For example: 'serializer.save(owner=request.user)'.'"
        )

        assert not hasattr(self, "_data"), (
            "You cannot call `.save()` after accessing `serializer.data`."
            "If you need to access data before committing to the database then "
            "inspect 'serializer.validated_data' instead. "
        )

    def __update_or_create_user(
        self, instance: Player | None, validated_data: dict[str, Any]
    ) -> User:
        user_data = validated_data["user"]
        user_filter = models.Q(email=user_data["email"]) | models.Q(
            pk=getattr(instance, "user_id", None)
        )
        user = auth.get_user_model().objects.filter(user_filter).first()
        serializer = UserWriteSerializer(user, data=self.__get_user_payload(user_data))
        serializer.is_valid(raise_exception=True)
        validated_data["user"] = serializer.save()

    def __get_user_payload(
        self, validated_data: Mapping[str, Any]
    ) -> Mapping[str, Any]:
        return {
            field: validated_data[field]
            for field in validated_data.keys()
            if field in self.__user_fields
        }

    @property
    def __user_fields(self) -> Sequence[str]:
        return ["first_name", "last_name", "email", "password"]

    def update(self, instance: Player, validated_data: dict[str, Any]) -> Player:
        avatar: UploadedFile = validated_data.pop("avatar", None)

        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.save()

        save_file_to_file_field.delay(
            pickle.dumps(instance.avatar), pickle.dumps(avatar)
        )

        return instance

    class Meta:
        model = Player
        fields = (
            "id",
            "email",
            "password",
            "avatar",
            "first_name",
            "last_name",
            "date_of_birth",
            "weight",
            "height",
            "hometown_country",
            "hometown_state_province",
            "hometown_city",
            "best_hand",
            "backhand",
        )


class PlayerReadSerializer(serializers.ModelSerializer[Player]):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Player
        fields = (
            "first_name",
            "last_name",
            "avatar",
            "date_of_birth",
            "age",
            "hometown_country",
            "hometown_state_province",
            "hometown_city",
            "weight",
            "height",
            "best_hand",
            "backhand",
            "wins",
            "losses",
            "num_of_titles",
        )
        read_only_fields = fields
