import Card from "./Card";
import {getWeather} from "@/api.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import Sunrise from "/src/assets/sunrise-svgrepo-com.svg?react";
import Sunset from "/src/assets/sunset-svgrepo-com.svg?react";
import WindSpeed from "/src/assets/wind-svgrepo-com.svg?react";
import Pressure from "/src/assets/pressure-climate-svgrepo-com.svg?react";
import Cloud from "/src/assets/cloudy-svgrepo-com.svg?react";
import Uv from "/src/assets/uv-index-alt-svgrepo-com.svg?react";
import UpArrow from "/src/assets/arrow-up-wide-short-svgrepo-com.svg?react";
import type {Coords} from "@/types/types.ts";

export default function AdditionalInfo({coords}: { coords: Coords }) {
    const {data} = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: () => getWeather({lat: coords.lat, lon: coords.lon}),
    });

    return (
        <Card
            title="Additional Info"
            childrenClassName="grid grid-cols-1 md:grid-cols-2 "
        >
            {rows.map(({label, value, Icon}) => (
                <div
                    key={label}
                    className="flex justify-between py-2"
                >
                    <div className="flex gap-4">
                        <Icon className="size-8 invert" />
                        <span className="text-gray-500 ml-2">{label}</span>
                    </div>
                    <span>
            <FormatTime
                value={value}
                number={data?.current[value]}
            />
          </span>
                </div>
            ))}
        </Card>
    );
}

function FormatTime({value, number}: { value: string; number: number | undefined }) {
    if (value === "sunset" || value === "sunrise") {
        // @ts-expect-error - number but it says undefined
        return new Date(number * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    if (value === "wind_deg")
        return (
            <UpArrow
                className="size-8 invert"
                style={{transform: `rotate(${number}deg)`}}
            />
        );
    return number;
}

const rows = [
    {label: "Cloudiness (%)", value: "clouds", Icon: Cloud},
    {label: "UV Index", value: "uvi", Icon: Uv},
    {label: "Wind Direction", value: "wind_deg", Icon: WindSpeed},
    {label: "Visibility", value: "visibility", Icon: Cloud},
    {label: "Pressure", value: "pressure", Icon: Pressure},
    {label: "Sunset", value: "sunset", Icon: Sunset},
    {label: "Sunrise", value: "sunrise", Icon: Sunrise},
] as const;
