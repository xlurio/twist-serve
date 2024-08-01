# mypy: ignore-errors
import os
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {"default": env.db(default="sqlite://db.sqlite3")}

# Caching
CACHES = {"default": env.cache()}

# Email

EMAIL_CONFIG = env.email("EMAIL_URL", str)
vars().update(EMAIL_CONFIG)
