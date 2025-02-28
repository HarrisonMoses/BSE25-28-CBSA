from rest_framework import serializers

from .models import Farm, User

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ['farm_id', 'name', 'location', 'created_at']

    def create(self, validated_data):
        user_id = self.context['user_id']
        return Farm.objects.create(user_id=user_id,**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name', 'email', 'password', 'created_at']