#! /bin/bash
set -e
set -x

python ./scripts/test_db_con.py
python manage.py migrate
gunicorn --reload