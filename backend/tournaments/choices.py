from django.db import models
from django.utils.translation import gettext_lazy as _


class SurfaceChoices(models.TextChoices):
    CLAY = "clay", _("clay")
    GRASS = "grass", _("grass")
    HARD = "hard", _("hard")
