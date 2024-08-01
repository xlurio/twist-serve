dockercompose=sudo docker compose -f docker-compose.local.yml
execdjango=$(dockercompose) exec django

createsuperuser:
	$(execdjango) sh -c "python manage.py createsuperuser"

down:
	$(dockercompose) down

djangologs:
	$(dockercompose) logs django

flush:
	$(execdjango) sh -c "python manage.py flush"

populateplayermatches:
	$(execdjango) sh -c "python manage.py populateplayermatches --num 30"

populatetournaments:
	$(execdjango) sh -c "python manage.py populatetournaments --num 30"

populatesubscriptions:
	$(execdjango) sh -c "python manage.py populatesubscriptions --num 90"

restartnginx:
	$(dockercompose) restart nginx

stop:
	$(dockercompose) stop

up:
	sudo docker compose -f docker-compose.local.yml up -d
