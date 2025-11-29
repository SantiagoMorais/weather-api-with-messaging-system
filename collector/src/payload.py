import pandas as pd
from .weather_data_record import WeatherDataRecord, FullWeatherPayload, WeatherMeta

def row_to_dict(row: pd.Series) -> WeatherDataRecord:
    return {
        "timestamp": str(row["date"].isoformat()),
        "temperature": float(row["temperature"]),
        "is_day": float(row["is_day"]), 
        "uv_index": float(row["uv_index"]),
        "relative_humidity": float(row["relative_humidity"]),
        "apparent_temperature": float(row["apparent_temperature"]),
        "precipitation_probability": float(row["precipitation_probability"]),
        "precipitation": float(row["precipitation"]),
        "rain": float(row["rain"]),
        "cloud_cover": float(row["cloud_cover"]),
        "visibility": float(row["visibility"]),
        "wind_speed": float(row["wind_speed"]),
        "soil_temperature": float(row["soil_temperature"]),
        "soil_moisture": float(row["soil_moisture"])
    }

def build_payload(
    current_row: pd.Series, 
    forecast_df: pd.DataFrame, 
    meta: WeatherMeta
    ) -> FullWeatherPayload:
    return {
        "location": meta,
        "current": row_to_dict(current_row),
        "forecast_24h": [row_to_dict(r) for _, r in forecast_df.iterrows()]
    }