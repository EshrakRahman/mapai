import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types/types";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};
type MapClickProps = {
  onMapClick: (lat: number, lon: number) => void;
};
export default function Map({ coords, onMapClick }: Props) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "600px", width: "1000px" }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}></Marker>
    </MapContainer>
  );
}

function MapClick({ onMapClick }: MapClickProps) {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo({ lat, lng });
    onMapClick(lat, lng);
  });
  return null;
}
