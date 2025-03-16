from ..models import Crop
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from ..serializers import CropSerializer


class CropViewSet(ModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    