import Card from "./Card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
// type Props = {}

export default function AdditionalInfo() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  return (
    <Card title="Additional Info" childrenClassName="flex flex-col">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex justify-between">
          <span className="text-gray-500">{label}</span>
          <span>
            <FormatTime value={value} number={data?.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatTime({value, number}: {value: string, number: number}) {
    if (value === "sunset" || value === "sunrise") {
        return new Date(number * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
 return number;
}   

const rows = [
  { label: "Cloudiness (%)", value: "clouds" },
  { label: "UV Index", value: "uvi" },
  { label: "Wind Direction", value: "wind_deg" },
  { label: "Visibility", value: "visibility" },
  { label: "Pressure", value: "pressure" },
  { label: "Sunset", value: "sunset" },
  { label: "Sunrise", value: "sunrise" },
] as const;
