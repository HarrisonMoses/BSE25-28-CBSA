from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from django.urls import path, include
from rest_framework_nested import routers
from .views import *



router = routers.DefaultRouter()
router.register('farmer', FarmerViewSet, basename='farmer')
router.register('device', DevicesViewSet, basename='device')
router.register('farms', FarmViewSet, basename='farms')
router.register('notification', UserNotificationView, basename='notification')
router.register('crop', CropViewSet, basename='crop')


#Farm Nested router: Farm -> FarmCrop and Farm -> devices
farm_router = routers.NestedDefaultRouter(router, 'farms', lookup='farms')
farm_router.register('crops', FarmCropViewSet, basename='farm-crops')
farm_router.register('devices', DeviceViewSet, basename='farm-devices')
farm_router.register('notification', FarmNotificationView, basename='farm-notification')
farm_router.register('data', FarmSensorDataViewSet, basename='farm-sensor-data')

# Farmer Nested Routes:
farmer_router =routers.NestedDefaultRouter(router, 'farmer', lookup='farmer')
farm_router.register('farms',FarmViewSet, basename='create-farm')

# Devices Nested routes:
device_router = routers.NestedDefaultRouter(router, 'device', lookup='device')
device_router.register("data", SensorDataViewSet, basename='device-sensor-data')




# Include routes in urlpatterns
urlpatterns = [
    path('', include(router.urls)),        
    path('', include(farm_router.urls)),
    path("", include(device_router.urls)), 
    path('mail/',send_email_view, name='email_view'),
    path('recommendation/<int:farm_id>/', view=crop_recommender_view, name='crop_recommender'), # /recomemdation/

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] 