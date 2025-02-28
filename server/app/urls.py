from django.urls import path, include

from .views import FarmViewSet, UserViewSet
from rest_framework_nested import routers
from rest_framework.routers import DefaultRouter

router = routers.DefaultRouter()
# router.register('farm',FarmViewSet ,basename='farm')
router.register('user',UserViewSet ,basename='user')

# Nested router for users and farms
farm_router = routers.NestedDefaultRouter(router, 'user', lookup='user')
farm_router.register('farm', FarmViewSet, basename='user-farms')

router.urls

urlpatterns = [
      path('', include(router.urls)),
      path('', include(farm_router.urls)),
]