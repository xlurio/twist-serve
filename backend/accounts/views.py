from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from accounts.serializers import UserReadSerializer

if TYPE_CHECKING:
    from accounts.models import User


class MeRetrieveAPIView(generics.RetrieveAPIView["User"]):
    queryset = get_user_model().objects.filter(is_active=True)
    serializer_class = UserReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self) -> User:
        return cast("User", self.request.user)
