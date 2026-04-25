import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types/types";
import { useEffect } from "react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const API_KEY = import.meta.env.VITE_API_KEY;

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

type MapClickProps = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

export default function Map({ coords, onMapClick, mapType }: Props) {
  const layer = mapType;
  const { lat, lon } = coords;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "600px", width: "1000px" }}
    >
      <MapClick coords={coords} onMapClick={onMapClick} />

      <MapTileLayer />

      <TileLayer
        opacity={0.7}
        url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick({ coords, onMapClick }: MapClickProps) {
  const map = useMap();

  // fix: correct property + safe update
  map.panTo([coords.lat, coords.lon]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
}

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "darkmatter",
      apiKey: "5L8wgHAwxZU7PDytsMuh",
    });
    tileLayer.addTo(map);
    return () => {
      tileLayer.remove();
    };
  }, [map]);
  return null;
}
