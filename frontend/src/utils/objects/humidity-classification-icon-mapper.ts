import type { THumidityClassification } from "@/core/types/humidity-classification";
import type { IconType } from "react-icons/lib";
import {
  WiHumidity,
  WiRaindrop,
  WiRaindrops,
  WiSprinkle,
} from "react-icons/wi";

export const humidityClassificationIcons: Record<
  THumidityClassification,
  IconType
> = {
  Dry: WiSprinkle,
  Normal: WiHumidity,
  Humid: WiRaindrop,
  "Very Humid": WiRaindrops,
};

export const getHumidityIcon = (key: THumidityClassification): IconType =>
  humidityClassificationIcons[key] || WiHumidity;
