#! /bin/bash
./venv/bin/python -m pip install --upgrade pip
./venv/bin/pip install --upgrade mypy pylint ruff django-stubs[compatible-mypy] \
    djangorestframework-stubs celery-types pylint-django

set -e
set -x

mypy .
find . -type f -not -path "./venv/*" -name "*.py" | grep -v "migrations" \
    | grep -v "gunicorn.conf.py" | xargs pylint
ruff check .
exec ruff format . --check
