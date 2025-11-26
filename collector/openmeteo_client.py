import openmeteo_requests
import pandas as pd
import requests_cache
from retry_requests import retry
from datetime import datetime
import pytz

from settings import settings

def fetch_weather():
    # Time handling
    local_tz = pytz.timezone(settings.TIMEZONE_API)
    now = datetime.now(local_tz)
    now_rounded = now.replace(minute=0, second=0, microsecond=0, tzinfo=None)

    # API setup
    cache_session = requests_cache.CachedSession(".cache", expire_after=3600) # 3600 seconds = An hour
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)

    # env
    url = settings.OPENMETEO_BASE
    latitude = settings.OPENMETEO_LAT
    longitude = settings.OPENMETEO_LON
    timezone = settings.TIMEZONE_API

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": [
            "temperature_2m", "rain", "apparent_temperature",
            "relative_humidity_2m", "cloud_cover", "cloud_cover_low",
            "cloud_cover_mid", "cloud_cover_high", "visibility",
            "wind_speed_10m", "soil_temperature_0cm",
            "soil_moisture_0_to_1cm", "precipitation_probability",
            "precipitation", "weather_code"
        ],
        "timezone": timezone,
    }

    response = openmeteo.weather_api(url, params=params)[0]
    hourly = response.Hourly()

    dataFrame = pd.DataFrame({
        "date": pd.date_range(
            start=pd.to_datetime(hourly.Time(), unit="s"),
            end=pd.to_datetime(hourly.TimeEnd(), unit="s"),
            freq=pd.Timedelta(seconds=hourly.Interval()),
            inclusive="left",
        ),
        "temperature": hourly.Variables(0).ValuesAsNumpy(),
        "rain": hourly.Variables(1).ValuesAsNumpy(),
        "apparent_temperature": hourly.Variables(2).ValuesAsNumpy(),
        "relative_humidity": hourly.Variables(3).ValuesAsNumpy(),
        "cloud_cover": hourly.Variables(4).ValuesAsNumpy(),
        "cloud_cover_low": hourly.Variables(5).ValuesAsNumpy(),
        "cloud_cover_mid": hourly.Variables(6).ValuesAsNumpy(),
        "cloud_cover_high": hourly.Variables(7).ValuesAsNumpy(),
        "visibility": hourly.Variables(8).ValuesAsNumpy(),
        "wind_speed": hourly.Variables(9).ValuesAsNumpy(),
        "soil_temperature": hourly.Variables(10).ValuesAsNumpy(),
        "soil_moisture": hourly.Variables(11).ValuesAsNumpy(),
        "precipitation_probability": hourly.Variables(12).ValuesAsNumpy(),
        "precipitation": hourly.Variables(13).ValuesAsNumpy(),
        "weather_code": hourly.Variables(14).ValuesAsNumpy(),
    })

    mask = dataFrame["date"] == now_rounded
    if not mask.any():
        raise ValueError("Current hour not found on the API response")
    
    current_data = dataFrame.loc[mask].iloc[0]
    current_index = dataFrame.index[mask][0]
    forecast_24h = dataFrame.iloc[current_index + 1 : current_index + 25]

    meta = {
        "latitude": latitude,
        "longitude": longitude,
        "timezone": timezone
    }
    
    return current_data, forecast_24h, meta
