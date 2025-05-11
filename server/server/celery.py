import os 
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings.prod')

celery = Celery('server', broker=[os.environ['REDIS_URL'] + '/0'])
celery.config_from_object('django.conf:settings', namespace='CELERY')
celery.autodiscover_tasks(lambda: settings.INSTALLED_APPS)



