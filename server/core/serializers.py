from django.forms import ValidationError
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import  UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as BaseTokenObtainPairSerializer
from .models import User

#Auth Serializers 
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id','username', 'first_name',"last_name", 'email', 'password',]
        # extra_kwargs = {
        #     'password': {'write_only': True},
        # }

class UserSerializer(BaseUserSerializer):
   class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name',
                  'last_name', 'email',
                  'username',
                  'is_active',
               
                  ]
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