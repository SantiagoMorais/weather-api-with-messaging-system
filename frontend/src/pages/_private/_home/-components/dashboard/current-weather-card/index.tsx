import { Card, CardContent } from "@/components/ui/card";
import type { ICustomWeatherInsight } from "@/core/interfaces/custom-weather-insights";
import type { IHourlyObservationWithId } from "@/core/interfaces/hourly-observation-with-id";
import { getSkyConditionIcon } from "@/utils/objects/sky-Condition-Icon-Mapper";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const CurrentWeatherCard = ({
  hourlyData,
  insightsData,
}: {
  insightsData: ICustomWeatherInsight;
  hourlyData: IHourlyObservationWithId;
}) => {
  const Icon = getSkyConditionIcon(insightsData.insights.skyCondition);

  return (
    <Card className="bg-background/60 w-fit min-w-80 flex-1 items-center justify-center backdrop-blur-sm">
      <CardContent className="flex w-fit flex-col flex-wrap items-center gap-4 md:flex-row">
        <Icon className="text-primary size-20" />
        <div className="mr-6 text-center md:text-start">
          <p className="text-sm">
            {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} -{" "}
            {new Date().getHours()}:{new Date().getMinutes()}
          </p>
          <h3 className="text-primary text-5xl font-black tracking-tighter">
            {hourlyData.hourlyObservation.temperature.toFixed(1)}º C
          </h3>
          <p className="">
            Sensação de{" "}
            {hourlyData.hourlyObservation.apparentTemperature.toFixed(1)}º C
          </p>
        </div>
        <div className="space-y-3 text-center md:text-start">
          <h4 className="font-bold tracking-tighter uppercase">
            Mais detalhes:
          </h4>
          <ul className="space-y-1">
            <li className="text-sm font-thin">
              Vel. do vento:{" "}
              <span> {hourlyData.hourlyObservation.windSpeed.toFixed(2)}</span>{" "}
              km/h
            </li>
            <li className="text-sm font-thin">
              Cobertura de nuvens:{" "}
              <span>{hourlyData.hourlyObservation.cloudCover}%</span>
            </li>
            <li className="text-sm font-thin">
              Precipitação:{" "}
              <span>
                {hourlyData.hourlyObservation.precipitation.toFixed(4)} mm
              </span>
            </li>
            <li className="text-sm font-thin">
              Umidade relativa:{" "}
              <span>
                {hourlyData.hourlyObservation.relativeHumidity.toFixed(1)}%
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
