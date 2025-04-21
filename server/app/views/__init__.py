from .FarmView import FarmViewSet
from .FarmerView import FarmerViewSet
from .FarmCropView import FarmCropViewSet
from .DeviceView import DeviceViewSet, DevicesViewSet
from .CropView import CropViewSet
from .email_view import send_email_view
from .SensorDataView import SensorDataViewSet,FarmSensorDataViewSet
from .NotificationView import UserNotificationView, FarmNotificationView
from .recommendation import crop_recommender_view, farm_monitoring_view
