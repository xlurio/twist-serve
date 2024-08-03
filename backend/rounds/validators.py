from __future__ import annotations

from typing import TYPE_CHECKING

from django.core import exceptions
from django.utils import deconstruct
from django.utils.translation import gettext_lazy as _

if TYPE_CHECKING:
    from typing import Any


@deconstruct.deconstructible
class EvenValidator:
    message = _("Ensure this value is even (it is %(value)s).")
    code = "even_value"

    def __init__(self, message: str | None = None) -> None:
        self.__message = message or self.__class__.message

    def __call__(self, value: int) -> None:
        if self.check(value):
            raise exceptions.ValidationError(
                self.__message, code=self.code, params={"value": value}
            )

    def __eq__(self, other: Any) -> bool:
        if not isinstance(other, self.__class__):
            return NotImplemented
        return self.message == other.message and self.code == other.code

    def check(self, a: int) -> bool:
        return a % 2 != 0
