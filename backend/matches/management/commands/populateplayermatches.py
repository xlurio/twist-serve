from __future__ import annotations

import itertools
from typing import TYPE_CHECKING, Any, cast

import faker
from django.core.management.base import BaseCommand, CommandParser
from django.db import transaction
from django.utils import timezone

from matches.choices import WinnerChoices
from matches.tests.factories import MatchFactory, MatchGameFactory, MatchSetFactory
from players.models import Player
from players.tests.factories import PlayerFactory
from subscriptions.tests.factories import SubscriptionFactory

if TYPE_CHECKING:
    from collections.abc import Mapping

    from matches.models import Match, MatchGame, MatchSet


class SetScore:
    def __init__(self) -> None:
        self.__player1_sets = 0
        self.__player2_sets = 0

    def compute_new_set(self, match_set: MatchSet) -> None:
        did_player1_win = match_set.get_winner() == WinnerChoices.PLAYER_1

        if did_player1_win:
            return self.__score_for_player1()

        self.__score_for_player2()

    def __score_for_player1(self) -> None:
        self.__player1_sets += 1

    def __score_for_player2(self) -> None:
        self.__player2_sets += 1

    @property
    def is_set_going(self) -> bool:
        return (self.__player1_sets < 2) and (self.__player2_sets < 2)

    def __str__(self) -> str:
        return (
            f"Sets:\n\tplayer1: {self.__player1_sets}"
            f"\n\tplayer2: {self.__player2_sets}"
        )


class GameScore:
    def __init__(self) -> None:
        self.__player1_games = 0
        self.__player2_games = 0

    def compute_new_game(self, match_set: MatchGame) -> None:
        did_player1_win = match_set.winner == WinnerChoices.PLAYER_1

        if did_player1_win:
            return self.__score_for_player1()

        self.__score_for_player2()

    def __score_for_player1(self) -> None:
        self.__player1_games += 1

    def __score_for_player2(self) -> None:
        self.__player2_games += 1

    @property
    def is_game_going(self) -> bool:
        return (self.__player1_games < 6) and (self.__player2_games < 6)

    def __str__(self) -> str:
        return (
            f"Games:\n\tplayer1: {self.__player1_games}"
            f"\n\tplayer2: {self.__player2_games}"
        )


class Command(BaseCommand):
    help = "Populates the matches for the specified player"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("player_id", type=int)
        parser.add_argument("--num", nargs="?", type=int, default=3)

    @transaction.atomic
    def handle(self, *args: Any, **options: int) -> None:
        player = Player.objects.get(pk=(options)["player_id"])
        num = options["num"]

        for match_idx in range(num):
            self.__create_match(match_idx, player)

        self.stdout.write(self.style.SUCCESS(f"{num} matches successfully created"))

    def __create_match(self, match_idx: int, player: Player) -> None:
        other_player = PlayerFactory.create()
        match: Match = MatchFactory.create(**self.__sort_players(player, other_player))
        did_match_happened = match.date <= timezone.localdate()
        SubscriptionFactory.create(player=player, tournament=match.tournament)

        if did_match_happened:
            self.__enrich_match(match)

        self.stdout.write(f"Created {match_idx + 1} matches for player '{player.pk}'")

    def __sort_players(
        self, player: Player, other_player: Player
    ) -> Mapping[str, Player]:
        is_chosen_player1 = faker.Faker().pybool()

        if is_chosen_player1:
            return {"player1": player, "player2": other_player}

        return {"player1": other_player, "player2": player}

    def __enrich_match(self, match: Match) -> None:
        score = SetScore()
        set_position_counter = itertools.count(1)

        while score.is_set_going:
            new_set = cast(
                "MatchSet",
                MatchSetFactory.create(
                    position=next(set_position_counter), match=match
                ),
            )
            new_set = self.__enrich_set(new_set)
            score.compute_new_set(new_set)
            self.stdout.write(str(score))

    def __enrich_set(self, match_set: MatchSet) -> MatchSet:
        score = GameScore()
        game_position_counter = itertools.count(1)

        while score.is_game_going:
            new_game = cast(
                "MatchGame",
                MatchGameFactory.create(
                    position=next(game_position_counter), game_set=match_set
                ),
            )
            score.compute_new_game(new_game)
            self.stdout.write(str(score))

        return match_set
