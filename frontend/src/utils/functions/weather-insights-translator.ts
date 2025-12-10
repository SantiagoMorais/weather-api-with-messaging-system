import type { THumidityClassification } from "@/core/types/humidity-classification";
import type { TSkyCondition } from "@/core/types/sky-conditions";
import type { TTemperatureClassification } from "@/core/types/temperature-classification";
import type { TWindClassification } from "@/core/types/wind-classification";

export const translateSkyCondition: Record<TSkyCondition, string> = {
  Sunny: "Ensolarado",
  "Mostly Sunny": "Predominantemente ensolarado",
  "Partly Cloudy": "Parcialmente nublado",
  Cloudy: "Nublado",
  Overcast: "Encoberto",
  Rainy: "Chuvoso",
  "Heavy Rain": "Chuva forte",
  Thunderstorm: "Tempestade",
  "Night Clear": "Noite limpa",
  "Night Cloudy": "Noite nublada",
  Unknown: "Desconhecido",
};

export const translateTemperature: Record<TTemperatureClassification, string> =
  {
    Cold: "Frio",
    Cool: "Ameno",
    Mild: "Moderado",
    Warm: "Quente",
    Hot: "Muito quente",
  };

export const translateWind: Record<TWindClassification, string> = {
  Calm: "Calmo",
  "Light Breeze": "Brisa leve",
  "Moderate Wind": "Vento moderado",
  "Strong Wind": "Vento forte",
  Gale: "Vendaval",
};

export const translateHumidity: Record<THumidityClassification, string> = {
  Dry: "Seco",
  Normal: "Normal",
  Humid: "Úmido",
  "Very Humid": "Muito úmido",
};
