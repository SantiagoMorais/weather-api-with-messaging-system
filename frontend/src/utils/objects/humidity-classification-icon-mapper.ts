import type { THumidityClassification } from "@/core/types/humidity-classification";
import type { IconType } from "react-icons/lib";
import {
  WiHumidity,
  WiRaindrop,
  WiRaindrops,
  WiSprinkle,
} from "react-icons/wi";

export const humidityClassificationIconMapper: {
  key: THumidityClassification;
  icon: IconType;
}[] = [
  { key: "Dry", icon: WiSprinkle }, // pouca umidade
  { key: "Normal", icon: WiHumidity }, // umidade média
  { key: "Humid", icon: WiRaindrop }, // úmido
  { key: "Very Humid", icon: WiRaindrops }, // muito úmido / chuva
];
