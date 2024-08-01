import random
import string

import factory
from factory import django

from players.choices import BackhandChoices, BestHandChoices


def _get_random_ascii_upper() -> str:
    ascii_uppercase_len = len(string.ascii_uppercase)
    return string.ascii_uppercase[random.randint(0, ascii_uppercase_len - 1)]


class PlayerFactory(django.DjangoModelFactory):
    class Meta:
        model = "players.Player"

    user = factory.SubFactory("accounts.tests.factories.UserFactory")
    date_of_birth = factory.Faker("date_of_birth", minimum_age=9)
    hometown_country = factory.Faker("country")
    hometown_state_province = factory.LazyFunction(
        lambda: "".join(_get_random_ascii_upper() for _ in range(2))
    )
    hometown_city = factory.Faker("city")
    weight = factory.Faker("pyint", min_value=50, max_value=100)
    height = factory.Faker("pyint", min_value=150, max_value=200)
    best_hand = factory.Faker("enum", enum_cls=BestHandChoices)
    backhand = factory.Faker("enum", enum_cls=BackhandChoices)
