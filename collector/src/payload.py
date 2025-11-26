def row_to_dict(row):
    return {
        "timestamp": row["date"].isoformat(),
        "temperature": float(row["temperature"]),
        "rain": float(row["rain"]),
        "apparent_temperature": float(row["apparent_temperature"]),
        "relative_humidity": float(row["relative_humidity"]),
        "cloud_cover": float(row["cloud_cover"]),
        "cloud_cover_low": float(row["cloud_cover_low"]),
        "cloud_cover_mid": float(row["cloud_cover_mid"]),
        "cloud_cover_high": float(row["cloud_cover_high"]),
        "visibility": float(row["visibility"]),
        "wind_speed": float(row["wind_speed"]),
        "soil_temperature": float(row["soil_temperature"]),
        "soil_moisture": float(row["soil_moisture"]),
        "precipitation_probability": float(row["precipitation_probability"]),
        "precipitation": float(row["precipitation"]),
        "weather_code": int(row["weather_code"]),
    }

def build_payload(current_row, forecast_df, meta):
    return {
        "location": meta,
        "current": row_to_dict(current_row),
        "forecast_24h": [row_to_dict(r) for _, r in forecast_df.iterrows()]
    }