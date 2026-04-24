import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {};

export default function DailyForcast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <Card title="Daily Forecast">
      {JSON.stringify(data?.daily).slice(0, 100)}
    </Card>
  );
}
