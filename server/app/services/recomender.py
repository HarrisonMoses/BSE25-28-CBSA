from openai import OpenAI
import openai
from django.conf import settings
from celery import shared_task
from rest_framework.response import Response
from rest_framework import status
from pydantic import BaseModel, Field
from asgiref.sync import sync_to_async
import os

from ..models import SensorData

# Set OpenAI API key


client = OpenAI(api_key = settings.OPENAI_API_KEY)

class Crop(BaseModel):
    name: str = Field(..., description="Name of the crop")
    rsn: str = Field(..., description="Reason why the crop is recommended")
    confidence_score: int = Field(..., description="Confidence score (0-100)")


class CropList(BaseModel):
    recommendations: list[Crop]


# Function to get the latest soil data for a farm
def get_recent_farm_soil_data(farm_id):
    latest_data = SensorData.objects.filter(farm_uuid=farm_id).order_by('-timestamp').first()
    if not latest_data:
        return None
    return latest_data


# OpenAI function calling tool definition
tools = [{
    "type": "function",
    "function": {
        "name": "get_recent_farm_soil_data",
        "description": "Get the recent soil data for the farm",
        "parameters": {
            "type": "object",
            "properties": {
                "farm_id": {"type": "number"},
            },
            "required": ["farm_id"],
            "additionalProperties": False
        },
        "strict": True,
    }
      
}]


# Celery task for recommending crops
# @shared_task
async def crop_recommender(farm_id) -> list[Crop]:
    input_messages = [
        {"role": "user", "content": f"Recommend crops for farm {farm_id} based on its latest soil data."}
    ]

    # OpenAI API Call
    response = await client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=input_messages,
        tools=tools,
        temperature=0.7,
    )

    # Extract recommendations from response
    recommendations = response.choices[0].message["content"]
    return recommendations
