from django.contrib import admin
from .models import User, Farm, Crop, Device, SensorData, CropRecommendation, FarmCrop

admin.site.register(User)
admin.site.register(Farm)
admin.site.register(Crop)
admin.site.register(Device)
admin.site.register(SensorData)
admin.site.register(CropRecommendation)
admin.site.register(FarmCrop)

# Register your models here.
