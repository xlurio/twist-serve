bind = "0.0.0.0:8000"
capture_output = False
wsgi_app = "app.wsgi:application"
accesslog = "/var/log/gunicorn.access.log"
errorlog = "/var/log/gunicorn.error.log"
