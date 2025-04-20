from openai import OpenAI
import openai
from django.conf import settings
from celery import shared_task
from rest_framework.response import Response
from rest_framework import status
from pydantic import BaseModel, Field
from agents import Agent,function_tool,Runner
from asgiref.sync import sync_to_async
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

@sync_to_async
def has_sensor_data(farm_id: int) -> bool:
    return SensorData.objects.filter(farm_uuid=farm_id).exists()

@sync_to_async
def _get_recent_farm_soil_data_sync(farm_id: int) -> dict:
    print(f"Tool called: Getting data for farm {farm_id}")
    try:
        latest_data = SensorData.objects.filter(farm_uuid=farm_id).order_by('-created_at').first()
        if not latest_data:
            print(f"No soil data found for farm {farm_id}")
            raise ValueError("No soil data found for the given farm.")
        
        soil_data = {
            "moisture": latest_data.moisture_level,
            "temperature": latest_data.temperature,
            "nitrogen": latest_data.nitrogen,
            "phosphorus": latest_data.phosphorous,
            "potassium": latest_data.potassium,
        }
        print(f"Fetched soil data for farm {farm_id}: {soil_data}")
        return soil_data

    except Exception as e:
        print(f"Exception occurred while fetching data: {e}")
        raise ValueError(f"An error occurred while retrieving soil data for farm {farm_id}: {e}")


@function_tool
async def get_recent_farm_soil_data(farm_id: int) -> dict:
    return await _get_recent_farm_soil_data_sync(farm_id)



agent = Agent(
    name="SoilCropRecommender",
    instructions=(
        f"Use the provided tool `get_recent_farm_soil_data` to fetch the soil data "
        f"for the farm with id. Do not guess or assume any data. "
        f"the returned data is in units ppm and celsius. "
        f"Use the data to recommend the best crops to grow in that farm. "
        f"If no data is returned from the tool, respond with an error message. "
        f"If data is available, recommend the best crops to grow using that data."
    ),
    model="gpt-4o",
    output_type=CropList,
    tools=[get_recent_farm_soil_data],
)
   


# Celery task for recommending crops
# @shared_task
async def crop_recommender(farm_id:int):
    response = await Runner.run(agent,f"what are the best crops to grow in farm {farm_id}?")
    return response.final_output
    
    


    
