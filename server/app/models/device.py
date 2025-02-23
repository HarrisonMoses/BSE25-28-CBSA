from django.db import models
from .farm import Farm  

class Device(models.Model):
    device_id = models.AutoField(primary_key=True)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name="devices")
    device_name = models.CharField(max_length=255)
    unique_id = models.CharField(max_length=255, unique=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.device_name