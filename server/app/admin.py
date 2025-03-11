from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Farmer, Farm, Crop, Device, SensorData, CropRecommendation, FarmCrop

admin.site.register(Farmer)
admin.site.register(Farm)
admin.site.register(Crop)
admin.site.register(Device)
admin.site.register(SensorData)
admin.site.register(CropRecommendation)
admin.site.register(FarmCrop)


# Register your models here.
