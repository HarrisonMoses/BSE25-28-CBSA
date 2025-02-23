from django.db import models
from .farm import Farm
from .crop import Crop

class FarmCrop(models.Model):
    id = models.AutoField(primary_key=True)
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name="crops")
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name="farms")
    created_at = models.DateTimeField(auto_now_add=True)
