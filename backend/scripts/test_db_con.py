#!/usr/bin/env python
from __future__ import annotations

import itertools
import os
import pathlib
import sys
import time
import traceback
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from django.db.backends.base.base import BaseDatabaseWrapper

PATH_TO_APPEND = str(pathlib.Path(__file__).parent.parent.resolve())
sys.path.append(PATH_TO_APPEND)
os.environ["DJANGO_SETTINGS_MODULE"] = "app.settings"

from django.db import connection, utils

connection: BaseDatabaseWrapper  # type: ignore[no-redef]


def main() -> None:
    counter = itertools.count(1)
    is_not_connected = True

    print("Testing connection with database")

    while is_not_connected:
        is_not_connected = _test_connection(counter)


def _test_connection(counter: itertools.count[int]) -> bool:
    curr_count = next(counter)
    print(f"Try {curr_count}...")

    try:
        connection.ensure_connection()
    except utils.OperationalError as exception:
        traceback.print_exc()
        print(f"Try {curr_count} failed: {exception}")
        time.sleep(1)
        return True

    return False


if __name__ == "__main__":
    main()
