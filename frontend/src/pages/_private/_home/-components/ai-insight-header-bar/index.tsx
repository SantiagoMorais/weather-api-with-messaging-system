import { getMostRecentInsight } from "@/api/weather-log/get-most-recent-insight";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { calculateStaleTimeUntilNextHour } from "@/utils/functions/calculate-stale-time-until-next-hour";
import { useQuery } from "@tanstack/react-query";

export const AIInsightHeaderBar = () => {
  const timeUntilNextHour = calculateStaleTimeUntilNextHour();

  const { isPending, error, data } = useQuery({
    queryKey: ["/weather-logs/insight"],
    queryFn: async () => await getMostRecentInsight(),
    staleTime: timeUntilNextHour,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const dataResponse = () => {
    const hour = new Date().getHours();

    if (isPending)
      return (
        <TextShimmerWave
          className="[--base-color:primary] [--base-gradient-color:primary/60]"
          duration={1}
          spread={1}
          zDistance={1}
          scaleDistance={1.1}
          rotateYDistance={20}
        >
          Carregando insight
        </TextShimmerWave>
      );
    if (error) return <p>Insight indisponível para o horário de {hour}h</p>;

    return (
      <InfiniteSlider>
        <p>{data.currentInsight}</p>;
      </InfiniteSlider>
    );
  };

  return <section>{dataResponse()}</section>;
};
