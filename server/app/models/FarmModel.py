from django.db import models
from .FarmerModel import Farmer

# Create your models here.
class Farm(models.Model):
    STATUS_CHOICES = [ ('A', 'Active'), ('M', 'Maintenance')]

    farm_id = models.AutoField(primary_key=True)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name="farm")
    name = models.CharField(max_length=255)
    size = models.FloatField(null=True)
    location = models.TextField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='A')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name