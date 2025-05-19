import requests
from datetime import datetime
from..models import SensorData, Device
from django.utils.dateparse import parse_datetime

def fetch_and_store_sensor_data():
    print('fetching data')
    API_URL = "https://api.thingspeak.com/channels/2912443/feeds.json?api_key=7SEG1UOO84U6C6QF&results=10"  
    response = requests.get(API_URL)
    data = response.json()
    
    feeds = data.get("feeds", [])

    # Initialize accumulators
    total_moisture = total_temp = total_n = total_p = total_k = count = 0

    for feed in feeds:
        try:
            moisture = float(feed.get("field1", 0))
            nitrogen = float(feed.get("field2", 0))
            phosphorous = float(feed.get("field3", 0))
            potassium = float(feed.get("field4", 0))
            temp = float(feed.get("field5", "0").strip())
        except ValueError:
            continue  # Skip entries with malformed data

        total_moisture += moisture
        total_n += nitrogen
        total_p += phosphorous
        total_k += potassium
        total_temp += temp
        count += 1

    if count == 0:
        return  

    # Calculates averages
    avg_moisture = total_moisture / count
    avg_temp = total_temp / count
    avg_n = total_n / count
    avg_p = total_p / count
    avg_k = total_k / count


    # print(f"Avg Moisture: {avg_moisture}, Avg Temp: {avg_temp}, Avg N: {avg_n}, Avg P: {avg_p}, Avg K: {avg_k}")
    # Create new SensorData record
    try:
        device = Device.objects.get(device_id=1)
        SensorData.objects.create(
            device = device,
            moisture_level=avg_moisture,
            temperature=avg_temp,
            nitrogen=avg_n,
            phosphorous=avg_p,
            potassium=avg_k,
            farm_uuid= "1",
        )
        print('data saved')
    except Device.DoesNotExist:
        print("Device with the given unique_id not found.")
    return
    




from celery import shared_task

@shared_task(name="app.services.periodicFetch.fetch_and_store_sensor_data")
def periodic_fetch_and_store():
    fetch_and_store_sensor_data()

