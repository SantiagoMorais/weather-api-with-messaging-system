export interface IObservationStats {
  timestamp: string;
  temperature: number;
  isDay: boolean;
  uvIndex: number;
  relativeHumidity: number;
  apparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  rain: number;
  cloudCover: number;
  visibility: number;
  windSpeed: number;
  soilTemperature: number;
  soilMoisture: number;
}
