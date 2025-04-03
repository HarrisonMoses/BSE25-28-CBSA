from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import asyncio

from ..models import Farm
from ..services.recomender import crop_recommender


@api_view(['GET'])
def crop_recommender_view(request, farm_id):  
    get_object_or_404(Farm, farm_id=farm_id)  

    try:
       
        recommendations = asyncio.run(crop_recommender(farm_id))
        return Response(recommendations, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
