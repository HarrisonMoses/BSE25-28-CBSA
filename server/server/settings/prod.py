from .base import *
import dj_database_url

ALLOWED_HOSTS = []  

CORS_ALLOWED_ORIGINS = []

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,  # Reuse connections for 10 minutes
        ssl_require=True   # Enforce SSL in production
    )
}

RENDER_FRONTEND_URL = os.environ.get('RENDER_FRONTEND_URL')
if RENDER_FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(RENDER_FRONTEND_URL)

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

CUSTOM_DOMAIN = os.environ.get('CUSTOM_DOMAIN')
if CUSTOM_DOMAIN:
    ALLOWED_HOSTS.append(CUSTOM_DOMAIN)

CELERY_BROKER_URL = os.environ['REDIS_URL'] + '/0'  # Use database 0 for Celery
