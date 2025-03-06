from rest_framework import serializers

from .models import Farm, User,FarmCrop, Crop ,Device

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name', 'email', 'password', 'created_at']



class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ['farm_id','user', 'name', 'location','size', 'created_at']

    def create(self, validated_data):
        user_id = self.context['user_id']
        return Farm.objects.create(user_id=user_id,**validated_data)

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = ['crop_id', 'crop','max_ideal_nitrogen', 'min_ideal_nitrogen','min_ideal_phosphorous', 'min_ideal_potassium', 'max_ideal_phosphorous','max_ideal_potassium']



class FarmCropSerializer(serializers.ModelSerializer):
    crop = CropSerializer(read_only=True)
    crop_id =serializers.PrimaryKeyRelatedField(queryset=Crop.objects.all(), write_only=True, source='crop')

    class Meta:
        model = FarmCrop
        fields = ['id','farm','crop','crop_id' ,'created_at']

    def create(self, validated_data):
        farm_id = self.context['farm_id']   
        return FarmCrop.objects.create(farm_id=farm_id, **validated_data)


'''Device serializer class '''
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['device_id', 'device_name', 'unique_id', 'status', 'created_at']

    def create(self, validated_data):
        farm_id = self.context['farm_id']
        return Device.objects.create(farm_id=farm_id, **validated_data)
        