from __future__ import annotations

import datetime
from typing import TYPE_CHECKING, Any, cast

import faker
from django.core.management.base import BaseCommand, CommandParser
from django.db import transaction, utils
from django.utils import timezone

from matches.models import Match, Match2MatchRelationship
from players.models import Player
from players.tests.factories import PlayerFactory
from rounds.models import Round
from subscriptions.tests.factories import SubscriptionFactory
from tournaments.tests.factories import TournamentFactory

if TYPE_CHECKING:
    from collections.abc import Mapping

    from matches.managers import (
        Match2MatchRelationshipManager,
        MatchManager,
        MatchQuerySet,
    )
    from rounds.managers import RoundManager
    from tournaments.models import Tournament


class Command(BaseCommand):
    help = "Populates the matches for the specified player"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("player_id", type=int)
        parser.add_argument("--num", nargs="?", type=int, default=3)
        parser.add_argument("--slots", nargs="?", type=int, default=32)

    @transaction.atomic
    def handle(self, *args: Any, **options: int) -> None:
        player = Player.objects.get(pk=(options)["player_id"])
        num = options["num"]
        tournaments_created = []

        for tournament_idx in range(num):
            tournaments_created.append(self.__create_tournament(options["slots"]))
            self.stdout.write(
                f"Created {tournament_idx + 1} tournaments for player '{player.pk}'"
            )

        self.__enrich_matches(
            cast(
                "MatchQuerySet",
                Match.objects.filter(
                    is_active=True, match_round__tournament__in=tournaments_created
                ),
            ),
            player,
        )

        self.stdout.write(self.style.SUCCESS(f"{num} matches successfully created"))

    def __create_tournament(self, slots: int) -> Tournament:
        tournament = cast(
            "Tournament",
            TournamentFactory.create(
                start_date=timezone.localdate() - datetime.timedelta(30)
            ),
        )
        cast("RoundManager", Round.objects).create_rounds_for_tournament(
            tournament, slots
        )
        cast("MatchManager", Match.objects).create_matches_for_rounds(
            tournament.rounds.filter(is_active=True)
        )
        cast(
            "Match2MatchRelationshipManager", Match2MatchRelationship.objects
        ).create_relationships_between_rounds(tournament.rounds.filter(is_active=True))

        return tournament

    def __enrich_matches(self, matches: MatchQuerySet, player: Player) -> None:
        for match_idx, match in enumerate(matches):
            self.__update_match(match_idx, match, player)

    def __update_match(self, match_idx: int, match: Match, player: Player) -> None:
        other_player = PlayerFactory.create()

        for key, value in self.__sort_players(player, other_player).items():
            setattr(match, key, value)

        match.save(update_fields=["player1", "player2"])
        self.__create_subscriptions_if_needed(match)

        self.stdout.write(
            f"Created {match_idx + 1} matches for tournament "
            f"'{match.match_round.tournament_id}'"
        )

    def __create_subscriptions_if_needed(self, match: Match) -> None:
        for player in [match.player1, match.player2]:
            self.__create_subscription_if_needed(
                cast("Player", player), match.match_round.tournament
            )

    def __create_subscription_if_needed(
        self, player: Player, tournament: Tournament
    ) -> None:
        try:
            with transaction.atomic():
                SubscriptionFactory.create(player=player, tournament=tournament)
        except utils.IntegrityError:
            ...

    def __sort_players(
        self, player: Player, other_player: Player
    ) -> Mapping[str, Player]:
        is_chosen_player1 = faker.Faker().pybool()

        if is_chosen_player1:
            return {"player1": player, "player2": other_player}

        return {"player1": other_player, "player2": player}
