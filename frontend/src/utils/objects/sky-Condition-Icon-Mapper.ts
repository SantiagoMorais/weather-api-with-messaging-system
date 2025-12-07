import type { TSkyCondition } from "@/core/types/sky-conditions";
import type { IconType } from "react-icons/lib";
import {
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiRainWind,
  WiThunderstorm,
  WiNightClear,
  WiNightAltCloudy,
  WiNa,
} from "react-icons/wi";

export const skyConditionIcons: Record<TSkyCondition, IconType> = {
  Sunny: WiDaySunny,
  "Mostly Sunny": WiDaySunnyOvercast,
  "Partly Cloudy": WiDayCloudy,
  Cloudy: WiCloud,
  Overcast: WiCloudy,
  Rainy: WiRain,
  "Heavy Rain": WiRainWind,
  Thunderstorm: WiThunderstorm,
  "Night Clear": WiNightClear,
  "Night Cloudy": WiNightAltCloudy,
  Unknown: WiNa,
};

export const getSkyConditionIcon = (key: TSkyCondition): IconType =>
  skyConditionIcons[key] || WiNa;
