from __future__ import annotations

from typing import TYPE_CHECKING

from django.core.management.base import BaseCommand
from django.db import transaction

from tournaments.tests.factories import TournamentFactory

if TYPE_CHECKING:
    from typing import Any

    from django.core.management.base import CommandParser


class Command(BaseCommand):
    help = "Populates the tournaments table"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--num", nargs="?", type=int, default=3)

    @transaction.atomic
    def handle(self, *args: Any, **options: int) -> None:
        num = options["num"]
        TournamentFactory.create_batch(num)

        self.stdout.write(self.style.SUCCESS(f"{num} tournaments created"))
