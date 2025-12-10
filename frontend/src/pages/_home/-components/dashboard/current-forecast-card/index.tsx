import { getCurrentForecast } from "@/api/weather-log/get-current-forecasts";
import { Card, CardContent } from "@/components/ui/card";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { calculateStaleTimeUntilNextHour } from "@/utils/functions/calculate-stale-time-until-next-hour";
import { useQuery } from "@tanstack/react-query";
import { ListX } from "lucide-react";
import { NextHoursForecastCard } from "./next-hours-forecasts-content";

export const CurrentForecastCard = () => {
  const timeUntilNextHour = calculateStaleTimeUntilNextHour;
  const { isPending, error, data } = useQuery({
    queryKey: ["/weather-logs/current-forecast"],
    queryFn: async () => await getCurrentForecast(),
    staleTime: timeUntilNextHour,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isPending)
    return (
      <Card className="w-fit">
        <CardContent className="flex items-center gap-2">
          <TextShimmerWave duration={1.2}>Carregando</TextShimmerWave>
        </CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="w-fit">
        <CardContent className="flex items-center gap-2">
          <ListX className="text-destructive" />
          <p>Erro ao encontrar dados!</p>
        </CardContent>
      </Card>
    );

  return <NextHoursForecastCard forecastData={data} />;
};
