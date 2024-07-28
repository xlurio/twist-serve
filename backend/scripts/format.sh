#! /bin/bash
./venv/bin/python -m pip install --upgrade pip
./venv/bin/pip install --upgrade black ruff

set -x

black .
ruff check . --fix
ruff format .