import { Card, CardContent } from "@/components/ui/card";
import type { ICustomWeatherInsight } from "@/core/interfaces/custom-weather-insights";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getSkyConditionIcon,
  getTemperatureIcon,
  getWindIcon,
  getHumidityIcon,
} from "@/utils/objects/";

export const CustomWeatherInsightsCard = ({
  insightsData,
}: {
  insightsData: ICustomWeatherInsight | undefined;
}) => {
  if (!insightsData) return;

  const {
    skyCondition,
    temperatureClassification,
    windClassification,
    humidityClassification,
    soilCondition,
    uvExposure,
    summary,
    timestamp,
  } = insightsData.insights;

  const SkyIcon = getSkyConditionIcon(skyCondition);
  const TempIcon = getTemperatureIcon(temperatureClassification);
  const WindIcon = getWindIcon(windClassification);
  const HumidityIcon = getHumidityIcon(humidityClassification);

  return (
    <Card className="bg-background/60 relative min-w-80 flex-2 items-center justify-center shadow-sm backdrop-blur-sm">
      <CardContent className="flex w-fit flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">Condições Gerais</h3>
          <p className="text-muted-foreground text-sm">
            {format(timestamp, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        {/* Summary */}
        <p className="text-primary text-center font-semibold tracking-tight lg:text-left">
          {summary}
        </p>

        {/* Icons Row */}
        <div className="grid grid-cols-2 gap-4 text-center lg:grid-cols-4">
          <div className="space-y-1">
            <SkyIcon className="text-primary mx-auto size-10" />
            <p className="text-sm font-semibold">Céu</p>
            <p className="text-muted-foreground text-xs">{skyCondition}</p>
          </div>

          <div className="space-y-1">
            <TempIcon className="mx-auto size-10 text-orange-400" />
            <p className="text-sm font-semibold">Temperatura</p>
            <p className="text-muted-foreground text-xs">
              {temperatureClassification}
            </p>
          </div>

          <div className="space-y-1">
            <WindIcon className="mx-auto size-10 text-blue-400" />
            <p className="text-sm font-semibold">Vento</p>
            <p className="text-muted-foreground text-xs">
              {windClassification}
            </p>
          </div>

          <div className="space-y-1">
            <HumidityIcon className="mx-auto size-10 text-cyan-400" />
            <p className="text-sm font-semibold">Umidade</p>
            <p className="text-muted-foreground text-xs">
              {humidityClassification}
            </p>
          </div>
        </div>

        {/* Extra info */}
        <div className="border-border/40 space-y-2 border-t pt-2 text-center lg:text-left">
          <p className="text-sm">
            <span className="font-semibold">Radiação UV: </span>
            {uvExposure}
          </p>

          <p className="text-sm">
            <span className="font-semibold">Condição do solo: </span>
            {soilCondition}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
