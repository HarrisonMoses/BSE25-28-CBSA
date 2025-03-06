from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Farm, Crop, Device, SensorData, CropRecommendation, FarmCrop

admin.site.register(User)
admin.site.register(Farm)
admin.site.register(Crop)
admin.site.register(Device)
admin.site.register(SensorData)
admin.site.register(CropRecommendation)
admin.site.register(FarmCrop)


class UserAdmin(BaseUserAdmin):
     add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username","email","first_name","last_name", "password1", "password2"),
            },
        ),
        )

# Register your models here.
