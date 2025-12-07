import type { TWindClassification } from "@/core/types/wind-classification";
import type { IconType } from "react-icons/lib";
import {
  WiWindDeg,
  WiStrongWind,
  WiDayWindy,
  WiCloudyGusts,
  WiCloudy,
} from "react-icons/wi";

export const windClassificationIconMapper: {
  key: TWindClassification;
  icon: IconType;
}[] = [
  { key: "Calm", icon: WiWindDeg },
  { key: "Light Breeze", icon: WiDayWindy },
  { key: "Moderate Wind", icon: WiCloudyGusts },
  { key: "Strong Wind", icon: WiStrongWind },
  { key: "Gale", icon: WiCloudy },
];
