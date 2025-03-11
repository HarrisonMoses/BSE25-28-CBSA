from django.shortcuts import get_object_or_404
from rest_framework.viewsets import  GenericViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from ..models import Farmer
from ..serializers import FarmerSerializer

class FarmerViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer

    @action(detail= False ,methods=['GET','PUT'])
    def me(self,request):
        farmer = get_object_or_404(Farmer , user_id = request.user.id)
        if request.method == 'GET':
            serializer = FarmerSerializer(farmer)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = FarmerSerializer(farmer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)