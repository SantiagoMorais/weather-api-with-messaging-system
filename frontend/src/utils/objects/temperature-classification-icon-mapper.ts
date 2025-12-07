import type { TTemperatureClassification } from "@/core/types/temperature-classification";
import type { IconType } from "react-icons/lib";
import {
  WiSnowflakeCold,
  WiCloud,
  WiDaySunny,
  WiHot,
  WiThermometer,
} from "react-icons/wi";

export const temperatureClassificationIcons: Record<
  TTemperatureClassification,
  IconType
> = {
  Cold: WiSnowflakeCold,
  Cool: WiCloud,
  Mild: WiThermometer,
  Warm: WiDaySunny,
  Hot: WiHot,
};

export const getTemperatureIcon = (key: TTemperatureClassification): IconType =>
  temperatureClassificationIcons[key] || WiThermometer;
