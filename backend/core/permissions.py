from __future__ import annotations

from typing import TYPE_CHECKING, cast

from django import views
from rest_framework import permissions, request

if TYPE_CHECKING:
    from accounts.models import User


class IsPlayer(permissions.BasePermission):
    def has_permission(self, request: request.Request, view: views.View) -> bool:
        return (
            cast("User", request.user).is_authenticated
            and cast("User", request.user).is_player
        )
