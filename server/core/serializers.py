from django.forms import ValidationError
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import  UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as BaseTokenObtainPairSerializer
from rest_framework import serializers

from .models import User
from app.models import Farmer

#Auth Serializers 
class UserCreateSerializer(BaseUserCreateSerializer):
    phone = serializers.CharField(max_length=15, required=True, write_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'phone',]
        extra_kwargs = {'password': {'write_only': True}, 'phone': {'write_only': True}}

    def validate(self, attrs):
        phone = attrs.pop("phone", None) 
        self._phone = phone  
        print("After validation, attrs:", attrs)                                    

        return attrs

    def create(self, validated_data):
        print("Inside create(), validated_data:", validated_data)       
        user = super().create(validated_data)  
        if hasattr(self, "_phone") and self._phone:
            Farmer.objects.create(user=user, phone=self._phone) 

        return user



class UserSerializer(BaseUserSerializer):
   phone = serializers.SerializerMethodField()
   class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name',
                  'last_name', 'email','phone',
                  'username',
                  'is_active',
               
                  ]
        read_only_fields = ('id', 'is_active')


   def validate(self, attrs):
        validated_attr = super().validate(attrs)
        username = validated_attr.get('username')

        user = user.objects.get(username=username)

        if user.is_deactivated:
            raise ValidationError(
                'Account deactivated')

        if not user.is_active:
            raise ValidationError(
                'Account not activated')

            return validated_attr
   def get_phone(self, obj):
        farmer = Farmer.objects.filter(user=obj).first()
        return farmer.phone if farmer else None
   
   

class TokenObtainPairSerializer(BaseTokenObtainPairSerializer):
     
     def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user
        data.update({
        'id': obj.id, 'first_name': obj.first_name,
        'last_name': obj.last_name, 'email': obj.email,
        'username': obj.username,
        'is_active': obj.is_active,
       
    })

        return data