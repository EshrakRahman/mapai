import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";

// type Props = {};

export default function HourlyForcast() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <Card
      title="Hourly Forecast"
      childrenClassName="flex gap-4 overflow-x-scroll gap-2 p-2"
    >
      {data?.hourly.slice(0, 24).map((hour) => (
        <div
          key={hour.dt}
          className="flex flex-col items-center space-x-3 gap-4"
        >
          <p className="w-9 whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              minute: "2-digit",
              hour: "numeric",
              hour12: true,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
