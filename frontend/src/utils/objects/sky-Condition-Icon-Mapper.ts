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

export const skyConditionIconMapper: { key: TSkyCondition; icon: IconType }[] =
  [
    { key: "Sunny", icon: WiDaySunny },
    { key: "Mostly Sunny", icon: WiDaySunnyOvercast },
    { key: "Partly Cloudy", icon: WiDayCloudy },
    { key: "Cloudy", icon: WiCloud },
    { key: "Overcast", icon: WiCloudy },
    { key: "Rainy", icon: WiRain },
    { key: "Heavy Rain", icon: WiRainWind },
    { key: "Thunderstorm", icon: WiThunderstorm },
    { key: "Night Clear", icon: WiNightClear },
    { key: "Night Cloudy", icon: WiNightAltCloudy },
    { key: "Unknown", icon: WiNa },
  ];
