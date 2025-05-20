from .base import *
import dj_database_url

DEBUG = False

ALLOWED_HOSTS = [
    'server-y3rq.onrender.com'
]  

CORS_ALLOWED_ORIGINS = [
    "https://agrsns.com/", 
]


SECRET_KEY = os.environ.get('SECRET_KEY')

CORS_ALLOWED_ORIGINS = []

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,  
        ssl_require=True   
    )
}


CUSTOM_DOMAIN = os.environ.get('CUSTOM_DOMAIN')
if CUSTOM_DOMAIN:
    ALLOWED_HOSTS.append(CUSTOM_DOMAIN)


redis_url = os.environ.get('REDIS_URL', 'redis://localhost:6379')
CELERY_BROKER_URL = redis_url + '/0'    # Use database 0 for Celery


CSRF_TRUSTED_ORIGINS = ['https://server-y3rq.onrender.com']