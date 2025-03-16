from django.db import models
from .DeviceModel import Device

class SensorData(models.Model):
    id = models.AutoField(primary_key=True)
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="sensor_data")
    moisture_level = models.FloatField()
    temperature = models.FloatField()
    nitrogen = models.FloatField()
    phosphorous = models.FloatField()
    potassium = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sensor Data {self.id}"
