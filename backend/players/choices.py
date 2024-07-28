from django.db import models
from django.utils.translation import gettext_lazy as _


class BestHandChoices(models.TextChoices):
    LEFT_HANDED = "left-handed", _("left-handed")
    RIGHT_HANDED = "right-handed", _("right-handed")


class BackhandChoices(models.TextChoices):
    ONE_HANDED = "one-handed", _("one-handed")
    TWO_HANDED = "two-handed", _("two-handed")
