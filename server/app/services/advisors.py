# In tasks.py (if using Celery)
from celery.utils.log import get_task_logger
logger = get_task_logger(__name__)
from celery import shared_task
from ..models import Farm
from .FarmMonitor import FarmMonitoringAgent
from django.utils import timezone

@shared_task(bind=True, name="app.services.advisors.monitor_all_farms")
def monitor_all_farms(self):
    try:
        logger.info(f"Starting farm monitoring task at {timezone.now()}")
        
        processed_farms = 0
        for farm in Farm.objects.all():
            try:
                logger.info(f"Processing farm {farm.farm_id} ({farm.name})")
                agent = FarmMonitoringAgent(farm.farm_id)
                result = agent.run_full_analysis()
                
                if result:
                    logger.info(f"Completed analysis for {farm.name}")
                else:
                    logger.warning(f"No analysis results for {farm.name} (likely no sensor data)")
                processed_farms += 1
                
            except Exception as farm_error:
                logger.error(f"Error processing farm {farm.farm_id}: {str(farm_error)}", exc_info=True)
                continue
                
        logger.info(f"Task completed. Processed {processed_farms} farms.")
        return {"processed_farms": processed_farms}
        
    except Exception as task_error:
        logger.error(f"Task failed: {str(task_error)}", exc_info=True)
        raise self.retry(exc=task_error, countdown=60)