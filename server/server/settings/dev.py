from .base import *

DEBUG = config("DEBUG", default=True, cast=bool)



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