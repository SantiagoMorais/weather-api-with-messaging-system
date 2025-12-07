import { getMostRecentCustomInsight } from "@/api/weather-log/get-most-recent-custom-insights";
import { getMostRecentHourlyObservation } from "@/api/weather-log/get-most-recent-hourly-observation";
import loginBackground from "@/assets/imgs/login-background.webp";
import { Card, CardContent } from "@/components/ui/card";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { calculateStaleTimeUntilNextHour } from "@/utils/functions/calculate-stale-time-until-next-hour";
import { useQuery } from "@tanstack/react-query";
import { ListX } from "lucide-react";
import { CurrentForecastCard } from "./current-forecast-card";
import { CurrentWeatherCard } from "./current-weather-card";
import { CurrentForecastChart } from "./current-forecast-as-chart";

export const Dashboard = () => {
  const timeUntilNextHour = calculateStaleTimeUntilNextHour;
  const {
    isPending: isHourlyPending,
    error: hourlyError,
    data: hourlyData,
  } = useQuery({
    queryKey: ["/weather-logs/hourly-observation"],
    queryFn: async () => await getMostRecentHourlyObservation(),
    staleTime: timeUntilNextHour,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    isPending: isInsightsPending,
    error: insightsError,
    data: insightsData,
  } = useQuery({
    queryKey: ["/weather-logs/custom-insights"],
    queryFn: async () => await getMostRecentCustomInsight(),
    staleTime: timeUntilNextHour,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const content = () => {
    if (isInsightsPending || isHourlyPending)
      return (
        <Card className="w-fit">
          <CardContent className="flex items-center gap-2">
            <TextShimmerWave duration={1.2}>Carregando</TextShimmerWave>
          </CardContent>
        </Card>
      );
    if (hourlyError || insightsError)
      return (
        <Card className="w-fit">
          <CardContent className="flex items-center gap-2">
            <ListX className="text-destructive" />
            <p>Erro ao encontrar dados!</p>
          </CardContent>
        </Card>
      );
    return (
      <CurrentWeatherCard hourlyData={hourlyData} insightsData={insightsData} />
    );
  };

  return (
    <section className="h-fit w-full p-4 pb-8 md:p-8 md:pb-12">
      <div className="border-primary/40 bg-background/20 relative size-full min-h-fit overflow-hidden rounded-lg border pb-10 backdrop-blur-sm">
        <img
          src={loginBackground}
          className="absolute -z-10 size-full object-cover opacity-30"
        />{" "}
        <div className="flex flex-wrap gap-4 p-4">
          {content()}
          <CurrentForecastCard />
        </div>
        <div className="px-4">
          <CurrentForecastChart />
        </div>
      </div>
    </section>
  );
};
