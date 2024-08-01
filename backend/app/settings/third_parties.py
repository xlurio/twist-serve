# mypy: ignore-errors
import datetime
import os
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# SimpleJWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": datetime.timedelta(hours=1),
    "TOKEN_OBTAIN_SERIALIZER": "app.serializers.CustomTokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "app.serializers.CustomTokenRefreshSerializer",
}

# Django REST Framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "app.pagination.CustomPageNumberPagination",
    "DEFAULT_VERSIONING_CLASS": "rest_framework.versioning.NamespaceVersioning",
    "EXCEPTION_HANDLER": "app.exception_handlers.exception_handler",
    "PAGE_SIZE": 10,
}

# Celery
CELERY_BROKER_URL = env("CELERY_BROKER_URL", str)

# Cross-Origin Resource Sharing
CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
