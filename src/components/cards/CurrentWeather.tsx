import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types/types";

// type Props = {};

export default function CurrentWeather({ coords }: { coords: Coords }) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-8"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(data?.current.temp ?? 0)}°C
        </h2>
        <WeatherIcon src={data?.current.weather[0].icon} className="size-14" />
        <p className="text-gray-500/75 capitalize">
          {data?.current.weather[0].description}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl">Local time:</p>
        <h3 className="text-4xl font-semibold">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data?.timezone,
          })}
        </h3>
      </div>
      <div className="flex justify-between w-full gap-2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels like</p>
          <p className="text-2xl font-bold">
            {Math.round(data?.current.feels_like ?? 0)}°C
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p className="text-2xl font-bold">
            {Math.round(data?.current.humidity ?? 0)}%
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p className="text-2xl font-bold">
            {Math.round(data?.current.wind_speed ?? 0)} m/s
          </p>
        </div>
      </div>
    </Card>
  );
}
