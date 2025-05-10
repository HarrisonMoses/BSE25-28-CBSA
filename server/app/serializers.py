from core.serializers import UserSerializer
from rest_framework import serializers
from .models import *

class FarmerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Farmer
        fields = ['id','user','phone','created_at']
        
'''Device serializer class '''
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['device_id', 'device_name', 'unique_id', 'status', 'created_at']

    def create(self, validated_data):
        farm_id = self.context['farm_id']
        return Device.objects.create(farm_id=farm_id, **validated_data)
    

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = '__all__'


class FarmCropSerializer(serializers.ModelSerializer):
    # crop = CropSerializer(read_only=True)
    crop_id =serializers.PrimaryKeyRelatedField(queryset=Crop.objects.all(), source='crop')
    crop = serializers.StringRelatedField()

    class Meta:
        model = FarmCrop
        fields = ['id','crop_id','crop','created_at']
        

    def create(self, validated_data):
        farm_id = self.context['farm_id']   
        return FarmCrop.objects.create(farm_id=farm_id, **validated_data)

class FarmNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def create(self, validated_data):
        farm_id = self.context['farm_id']
        if not farm_id:
            raise serializers.ValidationError("Farm ID is required to create a notification.")
        return Notification.objects.create(farm_id=farm_id, **validated_data)
    


class FarmSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True, read_only=True)
    crops = FarmCropSerializer(many=True, read_only=True)
    notifications = FarmNotificationSerializer(many=True, read_only=True)
    class Meta:
        model = Farm
        fields = ['farm_id','farm_uuid', 'name', 'location','size','status','created_at','devices','crops','notifications']
        read_only_fields = ['farm_id']

    def to_representation(self, instance):
        """Customize the serialized output based on the request method."""
        representation = super().to_representation(instance)
        
        # Check if the request is in the context
        if 'request' in self.context and self.context['request'].method in ['PUT', 'PATCH']:
            for field in self.Meta.read_only_fields:
                representation.pop(field, None)
        return representation

    def create(self, validated_data):
        farmer_id = self.context.get('farmer_id')
        if not farmer_id:
            raise serializers.ValidationError("Farmer ID is required to create a farm.")
        return Farm.objects.create(farmer_id=farmer_id, **validated_data)




class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ['id', 'moisture_level', 'temperature', 'nitrogen', 'phosphorous', 'potassium', 'farm_uuid', 'created_at']

    def create(self, validated_data):
        device_id = self.context['device_id']
        if not device_id:
            raise serializers.ValidationError("Device ID is required to create sensor data.")
        return SensorData.objects.create(device_id=device_id, **validated_data)

class FarmSensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ['id', 'moisture_level', 'temperature', 'nitrogen', 'phosphorous', 'potassium', 'farm_uuid', 'created_at']

    def create(self, validated_data):
        farm_id = self.context['farm_id']
        if not farm_id:
            raise serializers.ValidationError("Farm ID is required to create sensor data.")
        return SensorData.objects.create(farm_id=farm_id, **validated_data)
    


class UserNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


