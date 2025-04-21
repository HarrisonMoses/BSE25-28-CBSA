from rest_framework.viewsets import ModelViewSet
from ..models import FarmCrop, Farm , Crop

from ..serializers import FarmCropSerializer

class FarmCropViewSet(ModelViewSet):
    # queryset = FarmCrop.objects.all()
    serializer_class = FarmCropSerializer

    def get_queryset(self):
        return FarmCrop.objects.prefetch_related('farms').filter(farm=self.kwargs['farms_pk'])
    
    def get_serializer_context(self):
        return {'farm_id': self.kwargs['farms_pk']}