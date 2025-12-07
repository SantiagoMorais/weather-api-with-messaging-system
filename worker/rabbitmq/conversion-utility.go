package rabbitmq

import "worker/types"

func toAPIObservationStats(p types.PythonHourlyObservationStats) types.APIObservationStats {
    return types.APIObservationStats{
        Timestamp:               p.Timestamp,
        Temperature:             p.Temperature,
        // Converting float (0.0 or 1.0) to boolean
        IsDay:                   p.IsDay == 1.0, 
        UVIndex:                 p.UVIndex,
        RelativeHumidity:        p.RelativeHumidity,
        ApparentTemperature:     p.ApparentTemperature,
        PrecipitationProbability: p.PrecipitationProbability,
        Precipitation:           p.Precipitation,
        Rain:                    p.Rain,
        CloudCover:              p.CloudCover,
        Visibility:              p.Visibility,
        WindSpeed:               p.WindSpeed,
        SoilTemperature:         p.SoilTemperature,
        SoilMoisture:            p.SoilMoisture,
    }
}