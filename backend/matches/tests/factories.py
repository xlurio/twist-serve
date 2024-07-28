from __future__ import annotations

import random

import factory
from factory import django

from matches.choices import PointChoices


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
    player1_points = factory.Faker("enum", enum_cls=PointChoices)
    player2_points = factory.LazyAttribute(_generate_player2_points)
    game_set = factory.SubFactory("matches.tests.factories.MatchSetFactory")


class MatchSetFactory(django.DjangoModelFactory):
    class Meta:
        model = "matches.MatchSet"

    position = factory.Faker("pyint", min_value=1, max_value=5)
    match = factory.SubFactory("matches.tests.factories.MatchFactory")


class MatchFactory(django.DjangoModelFactory):
    class Meta:
        model = "matches.Match"

    player1 = factory.SubFactory("players.tests.factories.PlayerFactory")
    player2 = factory.SubFactory("players.tests.factories.PlayerFactory")
    observation = ""
    date = factory.Faker("date_this_year", after_today=True)
    tournament = factory.SubFactory("tournaments.tests.factories.TournamentFactory")
