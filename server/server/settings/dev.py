from .base import *

DEBUG = config("DEBUG", default=True, cast=bool)

redis_url = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
CELERY_BROKER_URL = redis_url 


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config("DB_NAME"),
        'USER': config("DB_USER"),
        'PASSWORD': config("DB_PASSWORD"),
        'HOST': config("WSL_HOST"),
        'PORT': config("DB_PORT"),
    }
}