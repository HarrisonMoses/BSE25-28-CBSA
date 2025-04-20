from django.shortcuts import get_object_or_404, render 
# from rest_framework.decorators import api_view
from django.db.models import Prefetch
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from ..models import Farm, Farmer, Device
from ..serializers import FarmSerializer


class FarmViewSet(ModelViewSet):
    serializer_class = FarmSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter farms by the authenticated user."""
        try:
            farmer = Farmer.objects.get(user_id=self.request.user.id)
        except Farmer.DoesNotExist:
            return Farm.objects.none()

        # devices = Prefetch('devices', queryset=Device.objects.all(), to_attr='set_devices')
        return Farm.objects.filter(farmer=farmer)

    def get_serializer_context(self):
        """Provide additional context to the serializer."""
        try:
            farmer = Farmer.objects.get(user_id=self.request.user.id)
        except Farmer.DoesNotExist:
            return {}

        return {'farmer_id': farmer.id}


