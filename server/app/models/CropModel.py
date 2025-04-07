from django.db import models

# Create your models here.
class Crop(models.Model):
    crop_id = models.AutoField(primary_key=True)
    crop = models.CharField(max_length=255, unique=True)
    nitrogen_min_ppm = models.FloatField()
    nitrogen_max_ppm = models.FloatField()
    phosphorous_min_ppm = models.FloatField()
    phosphorous_max_ppm = models.FloatField()
    potassium_min_ppm = models.FloatField()
    potassium_max_ppm = models.FloatField()

    # Humidity ranges in percentage
    humidity_min = models.FloatField(null=True)
    humidity_max = models.FloatField(null=True)

    def __str__(self):
        return self.crop
