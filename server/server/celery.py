import os 
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

celery = Celery('server', broker='redis://localhost:6379/1')
celery.config_from_object('django.conf:settings', namespace='CELERY')
celery.autodiscover_tasks()