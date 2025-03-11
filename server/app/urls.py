from django.urls import path, include
from rest_framework_nested import routers

from .views import FarmViewSet, FarmerViewSet,FarmCropViewSet,DeviceViewSet,FarmsViewSet 

router = routers.DefaultRouter()
router.register('farm', FarmsViewSet, basename='farm')
router.register('farmer', FarmerViewSet, basename='farmer')

# Nested router: Farm → FarmCrop
farmcrop_router = routers.NestedDefaultRouter(router, 'farm', lookup='farm')
farmcrop_router.register('farmcrop', FarmCropViewSet, basename='farm-farmcrop')

device_router = routers.NestedDefaultRouter(router, 'farm', lookup='farm')
device_router.register('device', DeviceViewSet, basename='farm-device')





# Include routes in urlpatterns
urlpatterns = [
    path('', include(router.urls)),        # /farmer,farm/
    path('', include(farmcrop_router.urls)), # /user/{user_id}/farm/{farm_id}/farmcrop/
    path('', include(device_router.urls)), #/user/{user_id}/device/
]