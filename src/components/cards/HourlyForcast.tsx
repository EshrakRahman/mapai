import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types/types";

// type Props = {};

export default function HourlyForcast({ coords }: { coords: Coords }) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
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
