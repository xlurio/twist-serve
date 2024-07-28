from __future__ import annotations

from typing import TYPE_CHECKING

import factory
import faker
from django.utils import timezone
from factory import django

from players.tests.factories import PlayerFactory

if TYPE_CHECKING:
    from players.models import Player


def _generate_tournament_name() -> str:
    return (
        faker.Faker().word() + " " + faker.Faker().word() + " " + faker.Faker().word()
    )


def _generate_winner(self: TournamentFactory) -> Player | None:
    if self.start_date <= timezone.localdate():
        return PlayerFactory.create()

    return None


class TournamentFactory(django.DjangoModelFactory):
    class Meta:
        model = "tournaments.Tournament"

    name = factory.LazyFunction(_generate_tournament_name)
    organization = factory.SubFactory(
        "organizations.tests.factories.OrganizationFactory"
    )
    start_date = factory.Faker("date_this_year", after_today=True)
    winner = factory.LazyAttribute(_generate_winner)
