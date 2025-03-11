from django.db import models
from .user import Farmer

# Create your models here.
class Farm(models.Model):
    farm_id = models.AutoField(primary_key=True)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name="farm")
    name = models.CharField(max_length=255)
    size = models.FloatField(null=True)
    location = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name