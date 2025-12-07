import { type THumidityClassification } from "../types/humidity-classification";
import { type TSkyCondition } from "../types/sky-conditions";
import { type TTemperatureClassification } from "../types/temperature-classification";
import { type TWindClassification } from "../types/wind-classification";

export interface ICustomWeatherInsight {
  insights: {
    timestamp: Date;
    summary: string; // Ex: "Mostly Sunny, Warm and Humid"
    skyCondition: TSkyCondition;
    temperatureClassification: TTemperatureClassification;
    windClassification: TWindClassification;
    humidityClassification: THumidityClassification;
    uvExposure: string;
    soilCondition: string;
  };
}
