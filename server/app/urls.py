from django.urls import path, include
from rest_framework_nested import routers

from .views import FarmViewSet, UserViewSet,FarmCropViewSet,DeviceViewSet,FarmsViewSet 

router = routers.DefaultRouter()
router.register('user', UserViewSet, basename='user')
router.register('farm', FarmsViewSet, basename='farm')

# Nested router: User → Farms
farm_router = routers.NestedDefaultRouter(router, 'user', lookup='user')
farm_router.register('farm', FarmViewSet, basename='user-farms')

# Nested router: Farm → FarmCrop
farmcrop_router = routers.NestedDefaultRouter(router, 'farm', lookup='farm')
farmcrop_router.register('farmcrop', FarmCropViewSet, basename='farm-farmcrop')

device_router = routers.NestedDefaultRouter(router, 'farm', lookup='farm')
device_router.register('device', DeviceViewSet, basename='farm-device')





# Include routes in urlpatterns
urlpatterns = [
#     path('', include(router2.urls)),  # /farm/
    path('', include(router.urls)),        # /user/
    path('', include(farm_router.urls)),   # /user/{user_id}/farm/
    path('', include(farmcrop_router.urls)), # /user/{user_id}/farm/{farm_id}/farmcrop/
    path('', include(device_router.urls)), #/user/{user_id}/device/
]