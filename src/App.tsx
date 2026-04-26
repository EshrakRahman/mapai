import DailyForcast from "./components/cards/DailyForcast";
import HourlyForcast from "./components/cards/HourlyForcast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import {Suspense, useState} from "react";
import type {Coords} from "./types/types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getGeoCode} from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "@/components/MapLegend.tsx";
import CurrentSkeletons from "@/components/skeletons/CurrentSkeletons.tsx";
import DailySkeleton from "@/components/skeletons/DailySkeleton.tsx";
import HourlySkeleton from "@/components/skeletons/HourlySkeleton.tsx";
import AdditionalSkeleton from "@/components/skeletons/AdditionalSkeleton.tsx";
import SidePanel from "@/components/cards/SidePanel.tsx";

export default function App() {
    const [coordinates, setCoordinates] = useState<Coords>({lat: 40, lon: 50});
    const [location, setLocation] = useState<string>("Tokyo");
    const [mapType, setMapType] = useState<string>("temp_new");

    const {data: geoCodeData} = useSuspenseQuery({
        queryKey: ["geocode", location],
        queryFn: () => getGeoCode(location),
    });

    const onMapClick = (lat: number, lon: number) => {
        setCoordinates({lat, lon});
        setLocation("custom");
    };

    const coords =
        location === "custom"
            ? coordinates
            : {lat: geoCodeData?.[0].lat ?? 0, lon: geoCodeData?.[0].lon ?? 0};

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex gap-8">
                    <div className="flex gap-4 items-center">
                        <p className="text-2xl font-semibold">Location</p>
                        <LocationDropdown
                            location={location}
                            setLocation={setLocation}
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-2xl font-semibold">Map Type</p>
                        <MapTypeDropdown
                            mapType={mapType}
                            setMapType={setMapType}
                        />
                    </div>
                </div>
                <div className=" ">
                    <Map
                        coords={coords}
                        onMapClick={onMapClick}
                        mapType={mapType}
                    />
                    <MapLegend mapType={mapType} />
                </div>
                <Suspense fallback={<CurrentSkeletons />}>
                    <CurrentWeather coords={coords} />
                </Suspense>
                <Suspense fallback={<DailySkeleton />}>
                    <DailyForcast coords={coords} />
                </Suspense>
                <Suspense fallback={<HourlySkeleton />}>
                    <HourlyForcast coords={coords} />
                </Suspense>
                <Suspense fallback={<AdditionalSkeleton />}>
                    <AdditionalInfo coords={coords} />
                </Suspense>
            </div>
            <SidePanel coords={coords} />
        </>
    );
}
