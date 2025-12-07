import { HumidityClassification } from "../enums/humidity-classification";
import { SkyCondition } from "../enums/sky-conditions";
import { TemperatureClassification } from "../enums/temperature-classification";
import { WindClassification } from "../enums/wind-classification";

export interface ICustomWeatherInsight {
  insights: {
    timestamp: Date;
    summary: string; // Ex: "Mostly Sunny, Warm and Humid"
    skyCondition: SkyCondition;
    temperatureClassification: TemperatureClassification;
    windClassification: WindClassification;
    humidityClassification: HumidityClassification;
    uvExposure: string;
    soilCondition: string;
  };
}
