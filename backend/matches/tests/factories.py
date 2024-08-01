from __future__ import annotations

import random
from typing import TYPE_CHECKING

import factory
import faker
from factory import django

from matches.choices import PointChoices

if TYPE_CHECKING:
    from matches.models import Match


def _generate_player2_points(self: MatchGameFactory) -> PointChoices:
    did_player1_won = self.player1_points == PointChoices.GAME

    if did_player1_won:
        return random.choice(
            [
                PointChoices.LOVE,
                PointChoices.FIFTEEN,
                PointChoices.THIRTY,
                PointChoices.FORTY,
            ]
        )

    return PointChoices.GAME


class MatchGameFactory(django.DjangoModelFactory):
    class Meta:
        model = "matches.MatchGame"

    position = factory.Faker("pyint", min_value=1)
    player1_points = factory.LazyFunction(
        lambda: random.choice(list(PointChoices) + ([PointChoices.GAME] * 3))
    )
    player2_points = factory.LazyAttribute(_generate_player2_points)
    game_set = factory.SubFactory("matches.tests.factories.MatchSetFactory")


def _create_match_for_match_set() -> Match:
    return MatchFactory.create(date=faker.Faker().date())


class MatchSetFactory(django.DjangoModelFactory):
    class Meta:
        model = "matches.MatchSet"

    position = factory.Faker("pyint", min_value=1, max_value=5)
    match = factory.LazyFunction(_create_match_for_match_set)


class MatchFactory(django.DjangoModelFactory):
    class Meta:
        model = "matches.Match"

    player1 = factory.SubFactory("players.tests.factories.PlayerFactory")
    player2 = factory.SubFactory("players.tests.factories.PlayerFactory")
    observation = ""
    date = factory.Faker("date_this_year", after_today=True)
    tournament = factory.SubFactory("tournaments.tests.factories.TournamentFactory")
