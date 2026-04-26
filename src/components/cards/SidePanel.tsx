import {Suspense} from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getAirPollution} from "@/api.ts";
import type {Coords} from "leaflet";
import Card from "@/components/cards/Card.tsx";

type Props = {

    coords: Coords;
}
export default function SidePanel(coords: Props) {

    return (
        <div className="fixed top-0 right-0 h-screen w-90 shadow-md  bg-sidebar z-1001 py-8 px-4 ">
            <Suspense>
                <AirPollution {...coords} />
            </Suspense>
        </div>
    );
};


function AirPollution({coords}: Props) {
    const {data} = useSuspenseQuery({
        queryKey: ['pollution', coords],
        queryFn: () => getAirPollution(coords)
    });

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold ">
                Air Pollution
            </h1>
            <h1 className="text-2xl font-semibold ">
                {data.list[0].main.aqi}
            </h1>
            <h1 className="text-l font-normal  ">
                AQI
            </h1>


            {Object.entries(data.list[0].components).map(([key, components]) => {
                return (
                    <Card
                        key={key}
                        className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60"
                    >
                        <div className="flex justify-between">
                            <span className="text-lg font-bold capitalize ">{key}</span>
                            <span className="text-lg font-bold ">{components}</span>
                        </div>
                    </Card>

                )
            })}
        </div>
    );
}