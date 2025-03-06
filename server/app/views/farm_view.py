from django.shortcuts import get_object_or_404, render 
# from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from ..models import Farm
from app.serializers import FarmSerializer


class FarmViewSet(ModelViewSet):
    # queryset = Farm.objects.all()
    serializer_class = FarmSerializer

    def get_queryset(self):
        return Farm.objects.filter(user=self.kwargs['user_pk'])

    def get_serializer_context(self):
        return {'user_id': self.kwargs['user_pk']}


class FarmsViewSet(ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

    