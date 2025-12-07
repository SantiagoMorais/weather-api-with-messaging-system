import type { TWindClassification } from "@/core/types/wind-classification";
import type { IconType } from "react-icons/lib";
import {
  WiWindDeg,
  WiStrongWind,
  WiDayWindy,
  WiCloudyGusts,
  WiCloudy,
} from "react-icons/wi";

export const windClassificationIcons: Record<TWindClassification, IconType> = {
  Calm: WiWindDeg,
  "Light Breeze": WiDayWindy,
  "Moderate Wind": WiCloudyGusts,
  "Strong Wind": WiStrongWind,
  Gale: WiCloudy,
};

export const getWindIcon = (key: TWindClassification): IconType =>
  windClassificationIcons[key] || WiWindDeg;
