import { Card, CardContent } from "@/components/ui/card";
import type { ICurrentForecastResponse } from "@/core/interfaces/current-forecast-response";
import { getSkyConditionIcon } from "@/utils/objects/sky-Condition-Icon-Mapper";
import { format } from "date-fns";

export const NextHoursForecastCard = ({
  forecastData,
}: {
  forecastData: ICurrentForecastResponse;
}) => {
  const nextSixHours = forecastData.currentForecast
    .filter((_, idx) => idx % 3 === 0)
    .slice(1, 7);

  return (
    <Card className="bg-background/60 w-full flex-1 backdrop-blur-sm">
      <CardContent className="flex flex-col gap-4">
        <h3 className="text-primary text-xl font-bold tracking-tight">
          Previsão das próximas 24h (resumo)
        </h3>

        <div className="grid grid-cols-2 gap-4 overflow-x-auto md:grid-cols-3 lg:grid-cols-6">
          {nextSixHours.map((hour, idx: number) => {
            const Icon = getSkyConditionIcon(
              hour.isDay &&
                new Date(hour.timestamp).getHours() < 18 &&
                new Date(hour.timestamp).getHours() > 6
                ? "Sunny"
                : "Night Clear"
            );

            return (
              <div
                key={`forecast-${idx}`}
                className="bg-background/30 flex flex-col items-center justify-center rounded-md p-2 text-center shadow-sm backdrop-blur-sm"
              >
                <p className="text-xs font-thin">
                  {format(new Date(hour.timestamp), "HH:mm")}
                </p>

                <Icon className="text-primary my-1 size-16" />

                <p className="text-sm font-bold">
                  {hour.temperature.toFixed(1)}ºC
                </p>

                <p className="text-xs font-thin">
                  Sensação: {hour.apparentTemperature.toFixed(1)}ºC
                </p>

                <p className="text-xs font-thin">
                  Umidade: {hour.relativeHumidity.toFixed(0)}%
                </p>

                <p className="text-xs font-thin">
                  Vento: {hour.windSpeed.toFixed(1)} km/h
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
