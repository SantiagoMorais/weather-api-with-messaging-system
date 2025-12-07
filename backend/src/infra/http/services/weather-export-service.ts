// src/weather-logs/weather-export.service.ts
import { Injectable } from "@nestjs/common";
import * as ExcelJS from "exceljs";
import * as Papa from "papaparse";
import { TWeatherLogControllerResponse } from "../modules/weather-log/models/schemas/weather-log-controller-request.schema";

type CsvRow = Record<string, string | number | boolean | null>;

@Injectable()
export class WeatherExportService {
  generateCSV(data: TWeatherLogControllerResponse): string {
    const stat = data.hourlyObservationStats;

    const row: CsvRow = {
      timestamp: stat.timestamp.toISOString(),
      temperature: stat.temperature,
      isDay: stat.isDay,
      uvIndex: stat.uvIndex,
      relativeHumidity: stat.relativeHumidity,
      apparentTemperature: stat.apparentTemperature,
      precipitationProbability: stat.precipitationProbability,
      precipitation: stat.precipitation,
      rain: stat.rain,
      cloudCover: stat.cloudCover,
      visibility: stat.visibility,
      windSpeed: stat.windSpeed,
      soilTemperature: stat.soilTemperature,
      soilMoisture: stat.soilMoisture,
      locationLongitude: data.location.longitude,
      locationLatitude: data.location.latitude,
      locationTimezone: data.location.timezone,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const csv: string = Papa.unparse([row]);
    return csv;
  }

  async generateXLSX(data: TWeatherLogControllerResponse): Promise<Buffer> {
    const stat = data.hourlyObservationStats;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Weather Data");

    sheet.columns = [
      { header: "Timestamp", key: "timestamp", width: 25 },
      { header: "Temperature", key: "temperature", width: 15 },
      { header: "Is Day", key: "isDay", width: 10 },
      { header: "UV Index", key: "uvIndex", width: 10 },
      { header: "Humidity", key: "relativeHumidity", width: 10 },
      { header: "Apparent Temp", key: "apparentTemperature", width: 15 },
      {
        header: "Precipitation Prob.",
        key: "precipitationProbability",
        width: 15,
      },
      { header: "Precipitation", key: "precipitation", width: 15 },
      { header: "Rain", key: "rain", width: 10 },
      { header: "Cloud Cover", key: "cloudCover", width: 10 },
      { header: "Visibility", key: "visibility", width: 10 },
      { header: "Wind Speed", key: "windSpeed", width: 10 },
      { header: "Soil Temp", key: "soilTemperature", width: 10 },
      { header: "Soil Moisture", key: "soilMoisture", width: 10 },
      { header: "Longitude", key: "locationLongitude", width: 15 },
      { header: "Latitude", key: "locationLatitude", width: 15 },
      { header: "Timezone", key: "locationTimezone", width: 20 },
    ];

    sheet.addRow({
      timestamp: stat.timestamp.toISOString(),
      temperature: stat.temperature,
      isDay: stat.isDay,
      uvIndex: stat.uvIndex,
      relativeHumidity: stat.relativeHumidity,
      apparentTemperature: stat.apparentTemperature,
      precipitationProbability: stat.precipitationProbability,
      precipitation: stat.precipitation,
      rain: stat.rain,
      cloudCover: stat.cloudCover,
      visibility: stat.visibility,
      windSpeed: stat.windSpeed,
      soilTemperature: stat.soilTemperature,
      soilMoisture: stat.soilMoisture,
      locationLongitude: data.location.longitude,
      locationLatitude: data.location.latitude,
      locationTimezone: data.location.timezone,
    });

    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(arrayBuffer);
  }
}
