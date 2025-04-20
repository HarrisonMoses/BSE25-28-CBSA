from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import openai
from django.conf import settings
import asyncio

from ..models import Farm
from ..services.crop_recommender import crop_recommender
from ..services.FarmMonitor import FarmMonitoringAgent

@api_view(['GET'])
def crop_recommender_view(request, farm_id):  
    get_object_or_404(Farm, farm_id=farm_id)  
    try:  
        recommendations = asyncio.run(crop_recommender(farm_id))
        return Response(recommendations.model_dump(), status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def farm_monitoring_view(request, farm_id):
    try:
        agent = FarmMonitoringAgent(farm_id)
        result = agent.run_full_analysis()
        return JsonResponse(result, safe=False)
    except Farm.DoesNotExist:
        return JsonResponse({"error": "Farm not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)