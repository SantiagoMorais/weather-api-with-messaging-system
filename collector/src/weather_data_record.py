from typing import TypedDict, List

class WeatherMeta(TypedDict):
    latitude: float
    longitude: float
    timezone: str

class WeatherDataRecord(TypedDict):
    timestamp: str
    temperature: float
    is_day: float 
    uv_index: float
    relative_humidity: float
    apparent_temperature: float
    precipitation_probability: float
    precipitation: float
    rain: float
    cloud_cover: float
    visibility: float
    wind_speed: float
    soil_temperature: float
    soil_moisture: float

class FullWeatherPayload(TypedDict):
    location: WeatherMeta
    current: WeatherDataRecord
    forecast_24h: List[WeatherDataRecord]