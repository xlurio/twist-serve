from __future__ import annotations

import random
from typing import TYPE_CHECKING, cast

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from subscriptions.tests.factories import SubscriptionFactory
from tournaments.models import Tournament

if TYPE_CHECKING:
    from typing import Any

    from django.core.management.base import CommandParser

    from subscriptions.models import Subscription

    [Subscription]  # pylint: disable=pointless-statement


class Command(BaseCommand):
    help = "Populates the subscriptions table"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--num", nargs="?", type=int, default=3)

    @transaction.atomic
    def handle(self, *args: Any, **options: int) -> None:
        num = options["num"]
        tournaments = Tournament.objects.filter(
            is_active=True, start_date__gte=timezone.localdate()
        )

        for _ in range(num):
            tournament = random.choice(tournaments)
            subscription = cast(
                "Subscription", SubscriptionFactory.create(tournament=tournament)
            )
            self.stdout.write(f"Subscription '{subscription.pk}' created")

        self.stdout.write(self.style.SUCCESS(f"{num} subscriptions created"))
