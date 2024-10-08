# mypy: ignore-errors
import os
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY", str)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG", bool, False)

USE_X_FORWARDED_HOST = True
ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "accounts",
    "core",
    "matches",
    "players",
    "rounds",
    "subscriptions",
    "tournaments",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "app.middlewares.JSendMiddleware",
]

ROOT_URLCONF = "app.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "app.wsgi.application"


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Authentication

AUTH_USER_MODEL = "accounts.User"

# Media files

MEDIA_ROOT = BASE_DIR / "media/"
MEDIA_URL = "media/"

# Logging

# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "formatters": {
#         "django.server": {
#             "()": "django.utils.log.ServerFormatter",
#             "format": "[{server_time}] {message}",
#             "style": "{",
#         }
#     },
#     "handlers": {
#         "console": {
#             "level": "INFO",
#             "class": "logging.StreamHandler",
#         },
#         "file": {
#             "level": "INFO",
#             "class": "logging.FileHandler",
#             "filename": "/var/log/django.log",
#         },
#         "django.server.console": {
#             "level": "INFO",
#             "class": "logging.StreamHandler",
#             "formatter": "django.server",
#         },
#         "django.server.file": {
#             "level": "INFO",
#             "class": "logging.FileHandler",
#             "filename": "/var/log/django.log",
#             "formatter": "django.server",
#         },
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["console", "file"],
#             "level": "INFO",
#         },
#         "django.server": {
#             "handlers": ["django.server.console", "django.server.file"],
#             "level": "INFO",
#             "propagate": False,
#         },
#     },
# }
