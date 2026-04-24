import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import DailyForcast from "./components/cards/DailyForcast";
import HourlyForcast from "./components/cards/HourlyForcast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";

export default function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <div className="flex flex-col gap-8">
      <CurrentWeather />
      <DailyForcast />
      <HourlyForcast />
      <AdditionalInfo />
    </div>
  );
}
