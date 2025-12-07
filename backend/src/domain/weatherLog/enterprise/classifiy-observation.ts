import { TObservationStats } from "src/infra/http/modules/weather-log/models/schemas/observation-stats.schema";
import { IWeatherInsight } from "./interfaces/custom-weather-insights";
import { SkyCondition } from "./enums/sky-conditions";
import { TemperatureClassification } from "./enums/temperature-classification";
import { WindClassification } from "./enums/wind-classification";
import { HumidityClassification } from "./enums/humidity-classification";

export function classifyObservation(stats: TObservationStats): IWeatherInsight {
  let skyCondition: SkyCondition;
  const { cloudCover, isDay, precipitation, precipitationProbability } = stats;

  if (precipitation > 0.1 || stats.rain > 0.1) {
    skyCondition =
      precipitation > 2 ? SkyCondition.HeavyRain : SkyCondition.Rainy;
  } else if (!isDay) {
    if (cloudCover >= 70) {
      skyCondition = SkyCondition.NightCloudy;
    } else {
      skyCondition = SkyCondition.NightClear;
    }
  } else if (cloudCover >= 90) {
    skyCondition = SkyCondition.Overcast;
  } else if (cloudCover >= 70) {
    skyCondition = SkyCondition.Cloudy;
  } else if (cloudCover >= 40) {
    skyCondition = SkyCondition.PartlyCloudy;
  } else if (cloudCover >= 10) {
    skyCondition = SkyCondition.MostlySunny;
  } else {
    skyCondition = SkyCondition.Sunny;
  }

  if (
    precipitationProbability >= 20 &&
    skyCondition !== SkyCondition.HeavyRain &&
    skyCondition !== SkyCondition.Rainy
  ) {
    skyCondition = SkyCondition.Rainy;
  }

  let tempClass: TemperatureClassification;
  const temp = stats.temperature;

  if (temp < 10) {
    tempClass = TemperatureClassification.Cold;
  } else if (temp < 18) {
    tempClass = TemperatureClassification.Cool;
  } else if (temp < 25) {
    tempClass = TemperatureClassification.Mild;
  } else if (temp < 30) {
    tempClass = TemperatureClassification.Warm;
  } else {
    tempClass = TemperatureClassification.Hot;
  }

  let windClass: WindClassification;
  const windSpeed = stats.windSpeed * 0.277778;

  if (windSpeed < 1.5) {
    windClass = WindClassification.Calm;
  } else if (windSpeed < 5.5) {
    windClass = WindClassification.LightBreeze;
  } else if (windSpeed < 10.8) {
    windClass = WindClassification.ModerateWind;
  } else if (windSpeed < 17.2) {
    windClass = WindClassification.StrongWind;
  } else {
    windClass = WindClassification.Gale;
  }

  let humidityClass: HumidityClassification;
  const rh = stats.relativeHumidity;

  if (rh < 40) {
    humidityClass = HumidityClassification.Dry;
  } else if (rh < 65) {
    humidityClass = HumidityClassification.Normal;
  } else if (rh < 85) {
    humidityClass = HumidityClassification.Humid;
  } else {
    humidityClass = HumidityClassification.VeryHumid;
  }

  let uvExposure = "Low";
  if (stats.uvIndex >= 3 && stats.uvIndex < 6) {
    uvExposure = "Moderate";
  } else if (stats.uvIndex >= 6 && stats.uvIndex < 8) {
    uvExposure = "High";
  } else if (stats.uvIndex >= 8) {
    uvExposure = "Very High";
  }

  let soilCondition = "Normal";
  const sm = stats.soilMoisture * 100;

  if (sm < 15) {
    soilCondition = "Very Dry";
  } else if (sm < 25) {
    soilCondition = "Dry";
  } else if (sm > 45) {
    soilCondition = "Saturated";
  }

  const tempPart =
    tempClass === TemperatureClassification.Hot
      ? "Hot"
      : tempClass === TemperatureClassification.Cold
        ? "Cold"
        : "";
  const windPart =
    windClass === WindClassification.StrongWind
      ? "Strong Wind"
      : windClass === WindClassification.Gale
        ? "Gale"
        : "";

  const summaryParts = [skyCondition, tempPart, humidityClass, windPart].filter(
    Boolean
  );

  const summary = summaryParts.join(", ");

  return {
    timestamp: stats.timestamp,
    summary,
    skyCondition,
    temperatureClassification: tempClass,
    windClassification: windClass,
    humidityClassification: humidityClass,
    uvExposure,
    soilCondition,
  };
}
