from __future__ import annotations

import datetime
import random
import string
from typing import TYPE_CHECKING

import factory
import faker
from factory import django

from tournaments.choices import SurfaceChoices

if TYPE_CHECKING:
    pass


def _generate_three_words_name() -> str:
    return (
        faker.Faker().word() + " " + faker.Faker().word() + " " + faker.Faker().word()
    )


def _get_random_ascii_upper() -> str:
    ascii_uppercase_len = len(string.ascii_uppercase)
    return string.ascii_uppercase[random.randint(0, ascii_uppercase_len - 1)]


class TournamentFactory(django.DjangoModelFactory):
    class Meta:
        model = "tournaments.Tournament"

    name = factory.LazyFunction(_generate_three_words_name)
    country = factory.Faker("country")
    state_province = factory.LazyFunction(
        lambda: "".join(_get_random_ascii_upper() for _ in range(2))
    )
    city = factory.Faker("city")
    neighborhood = factory.Faker("word")
    street = factory.Faker("street_name")
    building_number = factory.Faker("building_number")
    instalation = factory.LazyFunction(_generate_three_words_name)
    start_date = factory.Faker("date_this_year", after_today=True)
    end_date = factory.LazyAttribute(
        lambda self: self.start_date + datetime.timedelta(14)
    )
    surface = factory.Faker("enum", enum_cls=SurfaceChoices)
