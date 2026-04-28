import Card from "./Card";
import {getWeather} from "../../api";
import {useSuspenseQuery} from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";
import type {Coords} from "../../types/types";

// type Props = {};

export default function DailyForcast({coords}: { coords: Coords }) {
    const {data} = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: () => getWeather({lat: coords.lat, lon: coords.lon}),
    });

    return (
        <Card
            title="Daily Forecast"
            childrenClassName="flex flex-col gap-4 2xl:justify-between"
        >
            {data?.daily.map((day) => (
                <div
                    key={day.dt}
                    className="flex items-center justify-between gap-4"
                >
                    <p className="w-9">
                        {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: "short",
                        })}
                    </p>
                    <WeatherIcon src={day.weather[0].icon} />
                    <p>{Math.round(day.temp.day)}°C</p>
                    <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
                    <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
                </div>
            ))}
        </Card>
    );
}
