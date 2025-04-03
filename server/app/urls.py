from django.urls import path, include
from rest_framework_nested import routers

from .views import FarmViewSet, FarmerViewSet,FarmCropViewSet,DeviceViewSet,CropViewSet, send_email_view

router = routers.DefaultRouter()


router.register('farmer', FarmerViewSet, basename='farmer')
router.register('device', DeviceViewSet, basename='devices')
router.register('farm', FarmViewSet, basename='farm')
router.register('crop', CropViewSet, basename='crop')


# Nested router: Farm -> FarmCrop and Farm -> devices
farm_router = routers.NestedDefaultRouter(router, 'farm', lookup='farm')
farm_router.register('farmcrop', FarmCropViewSet, basename='farm-farmcrop')
farm_router.register('device', DeviceViewSet, basename='farm-device')





# Include routes in urlpatterns
urlpatterns = [
    path('', include(router.urls)),        # /farmer,farm/
    path('', include(farm_router.urls)), # /user/{user_id}/farm/{farm_id}/farmcrop/
    path('mail/',send_email_view, name='email_view'),
]