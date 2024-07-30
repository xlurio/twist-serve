#! /bin/bash
python -m pip install --upgrade pip
pip install --upgrade mypy pylint ruff django-stubs[compatible-mypy] \
    djangorestframework-stubs celery-types pylint-django

set -e
set -x

python -m mypy .
find . -type f -not -path "./venv/*" -name "*.py" | grep -v "migrations" \
    | grep -v "gunicorn.conf.py" | xargs python -m pylint
python -m ruff check .
python -m ruff format . --check
