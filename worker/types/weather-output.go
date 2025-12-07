package types

type APIObservationStats struct {
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

type FullWeatherPayload struct {
    CreatedAt              string                `json:"createdAt"`
    Location               Location              `json:"location"`
    HourlyObservationStats APIObservationStats   `json:"hourlyObservationStats"`
    CurrentForecastStats   []APIObservationStats `json:"currentForecastStats"`
}