from django.db import models
from django.db.backends.base import operations
from django.utils.translation import gettext_lazy as _

MAX_SMALL_INTEGER = operations.BaseDatabaseOperations.integer_field_ranges[
    "SmallIntegerField"
][1]


class PointChoices(models.IntegerChoices):
    LOVE = 0, _("love")
    FIFTEEN = 15, _("15")
    THIRTY = 30, _("30")
    FORTY = 40, _("40")
    GAME = MAX_SMALL_INTEGER, _("game")


class MatchPlayerChoices(models.TextChoices):
    PLAYER_1 = "player1", _("player 1")
    PLAYER_2 = "player2", _("player 2")
