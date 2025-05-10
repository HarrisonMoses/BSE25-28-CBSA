from django.db import models
import random
from .FarmerModel import Farmer

# Create your models here.
class Farm(models.Model):
    STATUS_CHOICES = [ ('A', 'Active'), ('M', 'Maintenance')]

    farm_id = models.AutoField(primary_key=True)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name="farm")
    name = models.CharField(max_length=255)
    size = models.FloatField(null=True)
    location = models.TextField()
    farm_uuid = models.CharField(max_length=6, unique=True, blank=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='A')
    created_at = models.DateTimeField(auto_now_add=True)


    def save(self, *args, **kwargs):
        if not self.farm_uuid:
            self.farm_uuid = self.generate_unique_farm_uuid()
        super().save(*args, **kwargs)
    
    @classmethod
    def generate_unique_farm_uuid(cls):
        while True:
            uuid = str(random.randint(100000, 999999))  
            if not cls.objects.filter(farm_uuid=uuid).exists():
                return uuid

    def __str__(self):
        return self.name