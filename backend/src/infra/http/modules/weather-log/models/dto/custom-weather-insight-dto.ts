import { ApiProperty } from "@nestjs/swagger";
import { HumidityClassification } from "src/domain/weatherLog/enterprise/enums/humidity-classification"; // Assumindo que os enums estão em "src/domain/weatherLog/application/enums"
import { SkyCondition } from "src/domain/weatherLog/enterprise/enums/sky-conditions";
import { TemperatureClassification } from "src/domain/weatherLog/enterprise/enums/temperature-classification";
import { WindClassification } from "src/domain/weatherLog/enterprise/enums/wind-classification";
import { ICustomWeatherInsight } from "src/domain/weatherLog/enterprise/interfaces/custom-weather-insights";

export class CustomWeatherInsightDTO implements ICustomWeatherInsight {
  @ApiProperty({
    description: "Timestamp da observação a que o insight se refere.",
    example: "2025-11-30T01:00:00.000Z",
    type: "string",
    format: "date-time",
  })
  timestamp: Date;

  @ApiProperty({
    description: "Resumo conciso das condições climáticas atuais.",
    example: "Mostly Sunny, Warm and Humid",
  })
  summary: string;

  @ApiProperty({
    description: "Classificação da condição do céu.",
    enum: SkyCondition,
    example: SkyCondition.Sunny,
  })
  skyCondition: SkyCondition;

  @ApiProperty({
    description: "Classificação da temperatura ambiente.",
    enum: TemperatureClassification,
    example: TemperatureClassification.Mild,
  })
  temperatureClassification: TemperatureClassification;

  @ApiProperty({
    description: "Classificação da velocidade e intensidade do vento.",
    enum: WindClassification,
    example: WindClassification.LightBreeze,
  })
  windClassification: WindClassification;

  @ApiProperty({
    description: "Classificação do nível de umidade.",
    enum: HumidityClassification,
    example: HumidityClassification.VeryHumid,
  })
  humidityClassification: HumidityClassification;

  @ApiProperty({
    description: "Classificação do risco de exposição UV.",
    example: "Low",
  })
  uvExposure: string;

  @ApiProperty({
    description: "Condição do solo baseada na umidade e temperatura.",
    example: "Saturated",
  })
  soilCondition: string;
}
