import factory
from factory import django


class SubscriptionFactory(django.DjangoModelFactory):
    class Meta:
        model = "subscriptions.Subscription"

    player = factory.SubFactory("players.tests.factories.PlayerFactory")
    tournament = factory.SubFactory("tournaments.tests.factories.TournamentFactory")
