from rest_framework.viewsets import ModelViewSet
from ..models import SensorData
from ..serializers import SensorDataSerializer,FarmSensorDataSerializer


class SensorDataViewSet(ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

    def get_queryset(self):
        return SensorData.objects.filter(device=self.kwargs['devices_pk'])
    
    def get_serializer_context(self):
        return {'device_id': self.kwargs['devices_pk']}
    


class FarmSensorDataViewSet(ModelViewSet):
    serializer_class = FarmSensorDataSerializer

    def get_queryset(self):
        return SensorData.objects.filter(farm_uuid=self.kwargs['farms_pk'])
    
    def get_serializer_context(self):
        return {'farm_id': self.kwargs['farms_pk']}