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
          className="transition-colors duration-300 [--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-300)]"
          duration={1}
          spread={1}
          zDistance={1}
          scaleDistance={1.1}
          rotateYDistance={20}
        >
          Carregando insight
        </TextShimmerWave>
      );
    if (
      error ||
      data.currentInsight === null ||
      data.currentInsight === undefined
    )
      return (
        <InfiniteSlider
          className="w-screen transition-colors duration-300"
          speed={100}
          gap={window.screen.width / 2}
          speedOnHover={50}
        >
          <p>Insight indisponível para o horário de {hour}h</p>
        </InfiniteSlider>
      );

    return (
      <InfiniteSlider
        className="w-full transition-colors duration-300"
        speed={100}
        speedOnHover={50}
        gap={window.screen.width / 3}
      >
        <p>{data.currentInsight}</p>
      </InfiniteSlider>
    );
  };

  return (
    <section className="via-secondary from-background to-background t relative border-y bg-linear-to-r py-1 text-center shadow backdrop-blur-sm">
      <div className="from-background via-background absolute top-0 z-10 h-full scale-150 bg-linear-to-r to-transparent transition-colors duration-300 md:w-30" />
      {dataResponse()}
      <div className="from-background via-background absolute top-0 right-0 z-10 h-full scale-150 bg-linear-to-l to-transparent transition-colors duration-300 md:w-30" />
    </section>
  );
};
