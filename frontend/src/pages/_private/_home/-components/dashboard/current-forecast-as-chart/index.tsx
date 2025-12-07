import { useMemo } from "react";
import { getCurrentForecast } from "@/api/weather-log/get-current-forecasts";
import { calculateStaleTimeUntilNextHour } from "@/utils/functions/calculate-stale-time-until-next-hour";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { X } from "lucide-react";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export const CurrentForecastChart = () => {
  const breakpoint = useBreakpoints();
  const timeUntilNextHour = calculateStaleTimeUntilNextHour;

  const { data, isPending, error } = useQuery({
    queryKey: ["/weather-logs/current-forecast"],
    queryFn: async () => await getCurrentForecast(),
    staleTime: timeUntilNextHour,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const chartData = useMemo(() => {
    if (!data) return [];

    const selected = data.currentForecast.filter(
      (_, i) => i % (breakpoint === "mobile" ? 3 : 2) === 0
    );

    return selected.map((hour) => ({
      Hora: format(new Date(hour.timestamp), "HH:mm"),
      Temperatura: Number(hour.temperature.toFixed(2)),
      "Sensação Térmica": Number(hour.apparentTemperature.toFixed(2)),
      "Umidade Relativa": hour.relativeHumidity,
      "Índice de radiação UV": Number(hour.uvIndex.toFixed(5)),
      "Cobertura de Nuvens": hour.cloudCover,
    }));
  }, [data]);

  if (isPending)
    return (
      <TextShimmerWave
        duration={1.2}
        className="bg-background/60 w-full rounded-lg p-4 py-6 text-center shadow"
      >
        Carregando gráfico...
      </TextShimmerWave>
    );
  if (error)
    return (
      <p className="bg-background/60 flex w-full items-center justify-center gap-2 rounded-lg p-4 py-6 text-center shadow">
        <X className="text-destructive" />
        Erro ao carregar dados do gráfico
      </p>
    );

  return (
    <ResponsiveContainer
      width="100%"
      height={breakpoint !== "mobile" ? 300 : 500}
    >
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        className="bg-background/50 rounded-md shadow"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#88888822" />
        <XAxis dataKey="Hora" />
        <YAxis />
        <Tooltip />
        <Legend align="right" />

        <Line
          type="natural"
          dataKey="Temperatura"
          stroke="#FF4C4C"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="natural"
          dataKey="Sensação Térmica"
          stroke="#FFA500"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="natural"
          dataKey="Umidade Relativa"
          stroke="#4C9FFF"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="natural"
          dataKey="Índice de radiação UV"
          stroke="#00B386"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="natural"
          dataKey="Cobertura de Nuvens"
          stroke="#AAAAAA"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
