import DailyForecast from "./components/cards/DailyForcast";
import HourlyForecast from "./components/cards/HourlyForcast";
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
import Hamburger from '/src/assets/hamburger-svgrepo-com.svg?react';
import MobileHeader from "@/components/MobileHeader.tsx";

export default function App() {
    const [coordinates, setCoordinates] = useState<Coords>({lat: 40, lon: 50});
    const [location, setLocation] = useState<string>("Tokyo");
    const [mapType, setMapType] = useState<string>("temp_new");
    const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);

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
            <MobileHeader setSidePanelOpen={setSidePanelOpen} />
            <div className="flex flex-col gap-8 p-8 w-full lg:w-[calc(100dvw - var(--sidepannel-width)] 2xl:h-screen 2xl:min-h-280 ">
                <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <p className="text-2xl font-semibold">Location</p>
                        <LocationDropdown
                            location={location}
                            setLocation={setLocation}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <p className="text-2xl font-semibold">Map Type</p>
                        <MapTypeDropdown
                            mapType={mapType}
                            setMapType={setMapType}
                        />
                    </div>

                    <button
                        onClick={() => setSidePanelOpen(true)}
                        className=" hidden xs:block "
                    >
                        <Hamburger className="size-6 invert ml-auto lg:hidden" />
                    </button>


                </div>
                <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 gap-8 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 order-1">
                    <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4  ">
                        <Map
                            coords={coords}
                            onMapClick={onMapClick}
                            mapType={mapType}
                        />
                        <MapLegend mapType={mapType} />
                    </div>
                    <div className='col-span-1 2xl:row-span-2 order-2'>
                        <Suspense fallback={<CurrentSkeletons />}>
                            <CurrentWeather coords={coords} />
                        </Suspense>
                    </div>

                    <div className='col-span-1 order-3 2xl:order-4 2xl:row-span-2 '>
                        <Suspense fallback={<DailySkeleton />}>
                            <DailyForecast coords={coords} />
                        </Suspense>
                    </div>
                    <div className='col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3'>
                        <Suspense fallback={<HourlySkeleton />}>
                            <HourlyForecast coords={coords} />
                        </Suspense>
                    </div>
                    <div className='col-span-1 md:col-span-2 2xl:row-span-1 order-5'>
                        <Suspense fallback={<AdditionalSkeleton />}>
                            <AdditionalInfo coords={coords} />
                        </Suspense>
                    </div>
                </div>
            </div>
            <SidePanel
                // @ts-expect-error -- same error for object
                coords={coords}
                isSidePanelOpen={sidePanelOpen}
                setSidePanelOpen={setSidePanelOpen}
            />
        </>
    );
}
