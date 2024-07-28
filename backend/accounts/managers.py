from __future__ import annotations

from typing import TYPE_CHECKING, Any, cast

from django.apps import apps
from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import BaseUserManager

if TYPE_CHECKING:
    from collections.abc import Mapping, Sequence

    from django.contrib.auth.backends import ModelBackend
    from django.contrib.auth.models import Permission
    from django.db.models import Model, QuerySet

    from accounts.models import User


class UserManager(BaseUserManager["User"]):
    use_in_migrations: bool = True

    def _create_user(
        self, email: str, password: str | None, **extra_fields: Any
    ) -> User:
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        global_user_model = cast(
            "User",
            apps.get_model(self.model._meta.app_label, self.model._meta.object_name),
        )
        email = global_user_model.normalize_username(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(
        self, email: str, password: str | None = None, **extra_fields: Any
    ) -> User:
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(
        self, email: str, password: str | None = None, **extra_fields: Any
    ) -> User:
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        self.__check_is_superuser(extra_fields)

        return self._create_user(email, password, **extra_fields)

    def __check_is_superuser(self, extra_fields: Mapping[str, Any]) -> None:
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

    # pylint: disable-next=too-many-arguments
    def with_perm(
        self,
        perm: str | Permission,
        is_active: bool = True,
        include_superusers: bool = True,
        backend: str | None = None,
        obj: Model | None = None,
    ) -> QuerySet[User]:
        backend_obj = self.__get_backend(backend)

        if hasattr(backend_obj, "with_perm"):
            return cast(
                "QuerySet[User]",
                backend_obj.with_perm(
                    perm,
                    is_active=is_active,
                    include_superusers=include_superusers,
                    obj=obj,
                ),
            )

        return self.none()

    def __get_backend(self, backend: str | None) -> ModelBackend:
        if backend is None:
            return self.__get_default_backend()

        return cast("ModelBackend", auth.load_backend(backend))

    def __get_default_backend(self) -> ModelBackend:
        backends = cast(
            "Sequence[tuple[ModelBackend, str]]",
            auth._get_backends(return_tuples=True),  # type: ignore
        )
        was_backend_found = len(backends) == 1

        if was_backend_found:
            return backends[0][0]

        raise ValueError(
            "You have multiple authentication backends configured and "
            "therefore must provide the `backend` argument."
        )
