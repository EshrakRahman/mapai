import DailyForcast from "./components/cards/DailyForcast";
import HourlyForcast from "./components/cards/HourlyForcast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types/types";

export default function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 40, lon: 50 });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  };

  return (
    <div className="flex flex-col gap-8">
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <DailyForcast coords={coords} />
      <HourlyForcast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}
