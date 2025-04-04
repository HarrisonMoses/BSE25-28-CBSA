from openai import OpenAI
import openai
from django.conf import settings
from celery import shared_task
from rest_framework.response import Response
from rest_framework import status
from pydantic import BaseModel, Field
from agents import Agent,function_tool,Runner
import json
import os

from ..models import SensorData

# Set OpenAI API key
openai_api_key = os.getenv('OPENAI_API_KEY', settings.OPENAI_API_KEY)
os.environ["OPENAI_API_KEY"] = openai_api_key

class Crop(BaseModel):
    name: str = Field(..., description="Name of the crop")
    rsn: str = Field(..., description="Reason why the crop is recommended")
    confidence_score: int = Field(..., description="Confidence score (0-100)")


class CropList(BaseModel):
    recommendations: list[Crop]


# Function to get the latest soil data for a farm
@function_tool
def get_recent_farm_soil_data(farm_id:int)->dict:
    latest_data = SensorData.objects.filter(farm_uuid=farm_id).order_by('-timestamp').first()
    if not latest_data:
        return {"error": "No soil data found for the given farm."}
    soil_data = {
        "moisture": latest_data.moisture_level,
        "temperature": latest_data.temperature,
        "nitrogen": latest_data.nitrogen,
        "phosphorus": latest_data.phosphorous,
        "potassium": latest_data.potassium,
    }
    return soil_data


def agent_func(farm_id:int):
    agent = Agent(
        name="SoilCropRecommender",
        instructions=f"Recommend the best crops to grow based on the soil data from the farm with an id of {farm_id}.",
        model="o3-mini",
        output_type=CropList,
        tools=[get_recent_farm_soil_data],
    )
    return agent


# Celery task for recommending crops
# @shared_task
async def crop_recommender(farm_id:int):
    response = await Runner.run(agent_func(farm_id),"what is the crop recommendation for the farm?")
    return response.final_output
    
    


    
