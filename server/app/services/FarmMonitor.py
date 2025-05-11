from django.utils import timezone
from datetime import timedelta
import openai
import logging
logger = logging.getLogger(__name__)

from ..models import Notification,Farm,SensorData
from .agents.nutrient_agent import nutrient_alert_agent

class FarmMonitoringAgent:
    def __init__(self, farm_id):
        try:
            self.farm = Farm.objects.get(pk=farm_id)
            self.crops = self.get_farm_crops()
            self.latest_sensor_data = self.get_latest_sensor_data()
        except Farm.DoesNotExist:
            raise ValueError(f"Farm with ID {farm_id} does not exist")
        except Exception as e:
            raise ValueError(f"Initialization error: {str(e)}")

    def get_farm_crops(self):
        """Gets all crops associated with the farm"""
        return self.farm.crops.all().select_related('crop')
    
    def get_latest_sensor_data(self) -> dict:
        farm_id = self.farm.farm_id  

        print(f"Tool called: Getting data for farm {farm_id}")
        try:
            latest_data = SensorData.objects.filter(farm_uuid=farm_id).order_by('-created_at').first()
            if not latest_data:
                print(f"No soil data found for farm {farm_id}")
                return
            
            soil_data = {
                "moisture": latest_data.moisture_level,
                "temperature": latest_data.temperature,
                "nitrogen": latest_data.nitrogen,
                "phosphorus": latest_data.phosphorous,
                "potassium": latest_data.potassium,
            }
            print(f"Fetched soil data for farm {farm_id}: {soil_data}")
            return soil_data
        except Exception as e:
            print(f"Exception occurred while fetching data: {e}")
            raise ValueError(f"An error occurred while retrieving soil data for farm {farm_id}: {e}")


    
    def analyze_soil(self):
        print("Analyzing soil data...")
        if not self.latest_sensor_data:    
            return
        
        soil_data = self.latest_sensor_data
        crops = self.crops
        alert = nutrient_alert_agent(soil_data,crops) 
        return alert  

    
    def create_notifications(self, alert:dict):
        """Create notification records for the farmer"""
        print(f"Creating notification for alert:")
        print(isinstance(alert,list))   
        Notification.objects.create(
            user=self.farm.farmer.user,
            title=alert.get('alert'),
            message=alert.get('description'),
            recommendation = alert.get('recommendation'),
            notification_type=Notification.NotificationType.FARM_ALERT,
            priority=alert.get('severity'),
            farm=self.farm
        )
    
    def run_full_analysis(self):
        """Enhanced with better logging and validation"""
        if not self.latest_sensor_data:
            logger.warning(f"No sensor data for farm {self.farm.farm_id}")
            return None
            
        try:
            alert:dict = self.analyze_soil()
            
            if alert:
                self.create_notifications(alert)
                logger.info(f"Created notifications for farm {self.farm.farm_id}")
                return {
                    'farm_id': self.farm.farm_id,
                    'alert': alert.get('alert'),
                    'alert_types': alert.get('serverity'),
                }
            return None
        except Exception as e:
            logger.error(f"Analysis failed for farm {self.farm.farm_id}: {str(e)}")
            raise