from rest_framework.viewsets import ModelViewSet
from ..models import Notification
from ..serializers import UserNotificationSerializer, FarmNotificationSerializer
from rest_framework.permissions import IsAuthenticated

class UserNotificationView(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = UserNotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    def get_serializer_context(self):
        return {'farm_id': self.kwargs['farms_pk']}
    
    

class FarmNotificationView(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = FarmNotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(farm=self.kwargs['farms_pk'])
    