# In tasks.py (if using Celery)
from celery import shared_task
from ..models import Farm
from .FarmMonitor import FarmMonitoringAgent 

# @shared_task
def monitor_all_farms():
    for farm in Farm.objects.all():
        agent = FarmMonitoringAgent(farm.pk)
        agent.run_full_analysis()