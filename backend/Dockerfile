FROM python:3.12.4-bullseye

WORKDIR /app

ENV PYTHONUNBUFFERED=x
ENV PYTHONDONTWRITEBYTECODE=x

COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

RUN addgroup --system --gid 1001 twistserve
RUN adduser --system --uid 1001 --shell /bin/bash --ingroup twistserve backend

RUN chown backend:twistserve /var/log/
RUN chmod 755 /var/log/

USER backend

RUN touch /var/log/django.log
RUN touch /var/log/gunicorn.access.log
RUN touch /var/log/gunicorn.error.log

COPY --chown=backend:twistserve --chmod=777 . /app

EXPOSE 8000

CMD ["bash", "./scripts/run.sh"]
