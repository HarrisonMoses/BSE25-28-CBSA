from django.urls import path, include
from rest_framework_nested import routers
from .views import *



router = routers.DefaultRouter()
router.register('farmer', FarmerViewSet, basename='farmer')
router.register('devices', DevicesViewSet, basename='devices')
router.register('farm', FarmViewSet, basename='farm')
router.register('crop', CropViewSet, basename='crop')


# Nested router: Farm -> FarmCrop and Farm -> devices
farm_router = routers.NestedDefaultRouter(router, 'farm', lookup='farm')
farm_router.register('farmcrop', FarmCropViewSet, basename='farm-farmcrop')
farm_router.register('device', DeviceViewSet, basename='farm-device')

farmer_router =routers.NestedDefaultRouter(router, 'farmer', lookup='farmer')
farm_router.register('farm',FarmViewSet, basename='create-farm')

device_router = routers.NestedDefaultRouter(router, 'devices', lookup='devices')
device_router.register("data", SensorDataViewSet, basename='device-sensor-data')




# Include routes in urlpatterns
urlpatterns = [
    path('', include(router.urls)),        
    path('', include(farm_router.urls)),
    path("", include(device_router.urls)), 
    path('mail/',send_email_view, name='email_view'),
    path('recommendation/<int:farm_id>/', view=crop_recommender_view, name='crop_recommender'), # /recomemdation/
]