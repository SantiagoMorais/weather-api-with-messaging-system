package types

type PythonHourlyObservationStats struct {
    Timestamp               string  `json:"timestamp"`
    Temperature             float64 `json:"temperature"`
    IsDay                   float64 `json:"is_day"` 
    UVIndex                 float64 `json:"uv_index"`
    RelativeHumidity        float64 `json:"relative_humidity"`
    ApparentTemperature     float64 `json:"apparent_temperature"`
    PrecipitationProbability float64 `json:"precipitation_probability"`
    Precipitation           float64 `json:"precipitation"`
    Rain                    float64 `json:"rain"`
    CloudCover              float64 `json:"cloud_cover"`
    Visibility              float64 `json:"visibility"`
    WindSpeed               float64 `json:"wind_speed"`
    SoilTemperature         float64 `json:"soil_temperature"`
    SoilMoisture            float64 `json:"soil_moisture"`
}

type PythonWeatherPayload struct {
    Location    Location                       `json:"location"`
    Current     PythonHourlyObservationStats   `json:"current"`
    Forecast24h []PythonHourlyObservationStats `json:"forecast_24h"`
}