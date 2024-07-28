# pylint: disable=abstract-method

from __future__ import annotations

import datetime
from http import cookiejar
from typing import TYPE_CHECKING, Any, cast

from django.contrib import auth
from django.contrib.auth import models as auth_models
from django.utils import timezone
from rest_framework_simplejwt import serializers as rsj_srlzs
from rest_framework_simplejwt import settings
from rest_framework_simplejwt.tokens import RefreshToken

if TYPE_CHECKING:
    from accounts.models import User

    class CookieJar:
        @staticmethod
        def time2netscape(t: datetime.datetime | None = None) -> str:
            raise NotImplementedError


class TokenLifeTimeSerializerMixin:
    def _get_lifetime(self, obj: RefreshToken) -> str:
        timestamp = (timezone.localtime() + obj.lifetime).timestamp()
        return cast("CookieJar", cookiejar).time2netscape(timestamp)


class CustomTokenObtainPairSerializer(
    TokenLifeTimeSerializerMixin, rsj_srlzs.TokenObtainSerializer
):
    token_class = RefreshToken
    user: User

    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        data = super().validate(attrs)

        refresh = cast("RefreshToken", self.get_token(self.user))

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data["lifetime"] = self._get_lifetime(refresh)

        if settings.api_settings.UPDATE_LAST_LOGIN:
            auth_models.update_last_login(auth.get_user_model(), self.user)

        return data


class CustomTokenRefreshSerializer(
    TokenLifeTimeSerializerMixin, rsj_srlzs.TokenRefreshSerializer
):
    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        refresh = self.token_class(attrs["refresh"])

        data = {
            "access": str(refresh.access_token),
            "lifetime": self._get_lifetime(refresh),
        }

        if settings.api_settings.ROTATE_REFRESH_TOKENS:
            data = self.__add_refresh_to_data(refresh, data)

        return data

    def __add_refresh_to_data(
        self,
        refresh: RefreshToken,
        data: dict[str, str],
    ) -> dict[str, str]:
        data_copy = data.copy()
        del data

        if settings.api_settings.BLACKLIST_AFTER_ROTATION:
            self.__try_to_blacklist(refresh)

        refresh.set_jti()
        refresh.set_exp()
        refresh.set_iat()

        data_copy["refresh"] = str(refresh)

        return data_copy

    def __try_to_blacklist(self, refresh: RefreshToken) -> None:
        try:
            refresh.blacklist()
        except AttributeError:
            pass
