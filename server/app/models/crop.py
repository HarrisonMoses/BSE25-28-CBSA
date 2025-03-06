from django.db import models

# Create your models here.
class Crop(models.Model):
    crop_id = models.AutoField(primary_key=True)
    crop = models.CharField(max_length=255, unique=True)
    min_ideal_nitrogen = models.FloatField()
    min_ideal_phosphorous = models.FloatField()
    min_ideal_potassium = models.FloatField()
    max_ideal_nitrogen = models.FloatField()
    max_ideal_phosphorous = models.FloatField()
    max_ideal_potassium = models.FloatField()

    def __str__(self):
        return self.crop
