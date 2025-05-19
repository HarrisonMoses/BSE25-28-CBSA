import os 
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings.dev')
redis_url = os.environ.get('REDIS_URL', 'redis://localhost:6379')

celery = Celery('server', broker=[redis_url + '/0'])
celery.config_from_object('django.conf:settings', namespace='CELERY')
celery.autodiscover_tasks(lambda: settings.INSTALLED_APPS)



