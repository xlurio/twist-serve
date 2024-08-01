#! /bin/bash

if [ $# -lt 1 ]
then
    echo "Usage: populateplayermatches.sh player_id"
fi

set -x

player_id=$1

sudo docker compose -f docker-compose.local.yml exec django sh -c \
    "python manage.py populateplayermatches $player_id --num 30"