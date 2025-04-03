from rest_framework.viewsets import ModelViewSet

from ..models import Device
from ..serializers import DeviceSerializer



class DeviceViewSet(ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

    def get_queryset(self):
        return Device.objects.filter(farm=self.kwargs['farm_pk'])
    
    def get_serializer_context(self):
        return {'farm_id': self.kwargs['farm_pk']}


class DevicesViewSet(ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

   