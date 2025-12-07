import type { TTemperatureClassification } from "@/core/types/temperature-classification";
import type { IconType } from "react-icons/lib";
import {
  WiSnowflakeCold,
  WiCloud,
  WiDaySunny,
  WiHot,
  WiThermometer,
} from "react-icons/wi";

export const temperatureClassificationIconMapper: {
  icon: IconType;
  key: TTemperatureClassification;
}[] = [
  { key: "Cold", icon: WiSnowflakeCold },
  { key: "Cool", icon: WiCloud },
  { key: "Mild", icon: WiThermometer },
  { key: "Warm", icon: WiDaySunny },
  { key: "Hot", icon: WiHot },
];
