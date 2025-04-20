from openai import OpenAI
from pydantic import BaseModel, Field
from enum import Enum
from django.conf import settings
import os
import json

# Set OpenAI API key
openai_api_key = os.getenv('OPENAI_API_KEY', settings.OPENAI_API_KEY)
client = OpenAI(api_key=openai_api_key)

class Severity(str, Enum):
    """Enum for severity levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Alert(BaseModel):
    """Model for nutrient alerts"""
    alert: str = Field(..., description="Description of the alert")
    severity: Severity = Field(..., description="Severity of the alert")
    description: str = Field(..., description="How are Crop(s) affected by the alert")
    recommedation: str = Field(..., description="Recommendation to resolve the alert")

class Recommendation(BaseModel):
    """Model for nutrient recommendations"""
    recommendation: list[str] = Field(..., description="Actions on how to improve soil conditions for the available crop(s)")
   
def nutrient_alert_agent(latest_sensor_data, crops):
    """Analyzes soil conditions against crop requirements"""
    if not latest_sensor_data:
        return []

    sensor = latest_sensor_data

    crop_info = [
        {
            "crop": fc.crop.crop,
            "requirements": {
                "nitrogen_min_ppm": fc.crop.nitrogen_min_ppm,
                "nitrogen_max_ppm": fc.crop.nitrogen_max_ppm,
                "phosphorous_min_ppm": fc.crop.phosphorous_min_ppm,
                "phosphorous_max_ppm": getattr(fc.crop, 'phosphorous_max_ppm', None), 
                "potassium_min_ppm": fc.crop.potassium_min_ppm,
                "potassium_max_ppm": fc.crop.potassium_max_ppm                
            }
        } for fc in crops
    ]

    sensor_values = {
        "nitrogen_ppm": sensor['nitrogen'],
        "phosphorus_ppm": sensor['phosphorus'],
        "potassium": sensor['potassium'],
    }

    prompt = (
        f"You are a smart agriculture assistant. A farm has the following recent sensor readings:\n"
        f"{sensor_values}\n\n"
        f"The farm is growing the following crops  with their nutrient requirements:\n"
        f"{crop_info}\n\n"
        f"Based on this data, identify any alerts where the sensor readings are outside the optimal range "
        f"for the alert povide a recommendation to resolve the alert.\n\n"
       
    )

    try:
        response = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            response_format=Alert ,
            max_tokens=700
        )

        gpt_output = response.choices[0].message.content
       
        alerts = json.loads(gpt_output)
        print(f"GPT output: {alerts}")
        return alerts

    except Exception as e:
        return [{"type": "error", "severity": "high", "message": f"GPT error: {str(e)}"}]





# def recommend_action_agent(alerts,crops):
#     """Uses GPT-agent to suggest additional context-aware actions for this farm"""
#     if not alerts:
#         return ["No critical issues detected. Maintain current farming practices."]

#     crop_info = [
#             {
#                 "crop": fc.crop.crop,
#                 "requirements": {
#                     "nitrogen_min_ppm": fc.crop.nitrogen_min_ppm,
#                     "nitrogen_max_ppm": fc.crop.nitrogen_max_ppm,
#                     "phosphorous_min_ppm": fc.crop.phosphorous_min_ppm,
#                     "phosphorous_max_ppm": getattr(fc.crop, 'phosphorous_max_ppm', None), 
#                     "potassium_min_ppm": fc.crop.potassium_min_ppm,
#                     "potassium_max_ppm": fc.crop.potassium_max_ppm                
#                 }
#             } for fc in crops
#         ]

#     prompt = (
#         f"You are an agronomist assistant AI. A farmer has reported the following soil alerts:\n"
#         f"{alerts}\n\n. These alerts are from conducting the soil tests.\n\n"
#         # f"These are the crops on the farm and their nutrient requirements:\n{crop_info}\n\n"
#         f"Suggest detailed actions the farmer should take to improve the conditions for the proper crops to grow well. "
#         f"Be actionable, Suggest 2 to 4 detailed actions the farmer should take..."

        
#     )

#     try:
#         response = client.beta.chat.completions.parse(
#             model="gpt-4o",
#             messages=[{"role": "user", "content": prompt}],
#             temperature=0.3,
#             response_format=Recommendation,
#             max_tokens=500
#         )

#         gpt_out_put = response.choices[0].message.content
#         suggestions =json.loads(gpt_out_put)
#         print(f"GPT suggestions: {suggestions}")
#         return suggestions
#     except Exception as e:
#         return [f"Error generating GPT suggestions: {str(e)}"]
