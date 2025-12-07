import { getMostRecentCustomInsight } from "@/api/weather-log/get-most-recent-custom-insights";
import { getMostRecentHourlyObservation } from "@/api/weather-log/get-most-recent-hourly-observation";
import loginBackground from "@/assets/imgs/login-background.webp";
import { Card, CardHeader } from "@/components/ui/card";
import { calculateStaleTimeUntilNextHour } from "@/utils/functions/calculate-stale-time-until-next-hour";
import { getSkyConditionIcon } from "@/utils/objects/sky-Condition-Icon-Mapper";
import { useQuery } from "@tanstack/react-query";
import { CurrentWeatherCard } from "./current-weather-card";

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

  if (isInsightsPending || isHourlyPending) return <>loading</>;
  if (hourlyError || insightsError) return <>error</>;

  const Icon = getSkyConditionIcon(insightsData.insights.skyCondition);

  return (
    <section className="size-full p-4 pb-8 md:p-8 md:pb-12">
      <ul className="border-primary/40 bg-background/20 relative size-full overflow-hidden rounded-md border backdrop-blur-sm">
        <img
          src={loginBackground}
          className="absolute -z-10 size-full rounded-lg object-cover opacity-30"
        />{" "}
        <div className="p-4">
          <CurrentWeatherCard
            hourlyData={hourlyData}
            insightsData={insightsData}
          />
        </div>
      </ul>
    </section>
  );
};
