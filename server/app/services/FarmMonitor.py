from django.utils import timezone
from datetime import timedelta
import openai

from ..models import Notification,Farm,SensorData
from .agents.nutrient_agent import nutrient_alert_agent

class FarmMonitoringAgent:
    def __init__(self, farm_id):
        self.farm = Farm.objects.get(pk=farm_id)
        self.crops = self.get_farm_crops()
        self.latest_sensor_data = self.get_latest_sensor_data()
    
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
                raise ValueError("No soil data found for the given farm.")
            
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
        soil_data = self.latest_sensor_data
        crops = self.crops
        alerts = nutrient_alert_agent(soil_data,crops) 
        return alerts  

    
    def create_notifications(self, alerts):
        """Create notification records for the farmer"""
        print
        
        for alert in alerts:
            Notification.objects.create(
                user=self.farm.farmer.user,
                title=alert['alert'],
                message=alert['recommendation'],
                recommendation=alert['recommendation'],
                notification_type=Notification.NotificationType.FARM_ALERT,
                priority=alert['severity'],
                farm=self.farm
            )
    
    def run_full_analysis(self):
        """Executes complete monitoring workflow"""
        if not self.latest_sensor_data:
            return "No recent sensor data available"
            
        alerts = self.analyze_soil()
        if not alerts:
            return "All soil parameters within normal ranges"
        
        self.create_notifications(recommendations=alerts)
        
        return {
            'farm': self.farm.name,
            'crops': [c.crop.crop for c in self.crops],
            'alerts': alerts,    
        }