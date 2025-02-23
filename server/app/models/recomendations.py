from django.db import models
from .sensor_data import SensorData

class CropRecommendation(models.Model):
    id = models.AutoField(primary_key=True)
    sensor_data = models.ForeignKey(SensorData, on_delete=models.CASCADE, related_name="recommendations")
    recommendation_details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recommendation {self.id}"