package types

type Location struct {
    Longitude float64 `json:"longitude"`
    Latitude  float64 `json:"latitude"`
    Timezone  string  `json:"timezone"`
}

type HourlyObservationStats struct {
    Timestamp               string  `json:"timestamp"`
    Temperature             float64 `json:"temperature"`
    IsDay                   bool    `json:"isDay"`
    UVIndex                 float64 `json:"uvIndex"`
    RelativeHumidity        float64 `json:"relativeHumidity"`
    ApparentTemperature     float64 `json:"apparentTemperature"`
    PrecipitationProbability float64 `json:"precipitationProbability"`
    Precipitation           float64 `json:"precipitation"`
    Rain                    float64 `json:"rain"`
    CloudCover              float64 `json:"cloudCover"`
    Visibility              float64 `json:"visibility"`
    WindSpeed               float64 `json:"windSpeed"`
    SoilTemperature         float64 `json:"soilTemperature"`
    SoilMoisture            float64 `json:"soilMoisture"`
}


type PythonWeatherPayload struct {
    Location    Location                   `json:"location"`
    Current     HourlyObservationStats     `json:"current"`
    Forecast24h []HourlyObservationStats   `json:"forecast_24h"`
}

type FullWeatherPayload struct {
    CreatedAt              string                   `json:"createdAt"`
    Location               Location                 `json:"location"`
    HourlyObservationStats HourlyObservationStats   `json:"hourlyObservationStats"`
    CurrentForecastStats   []HourlyObservationStats `json:"currentForecastStats"`
}


