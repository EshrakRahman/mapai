import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

type MapTypeProps = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};
export default function MapTypeDropdown({ mapType, setMapType }: MapTypeProps) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {types.map((city) => (
            <SelectItem key={city} value={city} className="capitalize">
              {city.split("_")[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const types = [
  "temp_new",
  "wind_new",
  "pressure_new",
  "precipitation_new",
  "clouds_new",
];
