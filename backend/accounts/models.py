from typing import TYPE_CHECKING, cast

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounts.managers import UserManager
from core.models import BaseModel

if TYPE_CHECKING:
    from players.models import Player


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    player: "Player"

    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    email = models.EmailField(
        _("email address"),
        unique=True,
        help_text=_("Required"),
        error_messages={
            "unique": _("A user with that email already exists."),
        },
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    @property
    def is_player(self) -> bool:
        return hasattr(self, "player")

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()

    def clean(self) -> None:
        super().clean()
        self.email = cast("UserManager", self.__class__.objects).normalize_email(
            self.email
        )
