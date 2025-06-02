import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function MapView({ stations }) {
  const center = [20.5937, 78.9629]; // Center of India, change as needed

  return (
    <MapContainer id="map" center={center} zoom={5} >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map(station => (
        <Marker
          key={station._id}
          position={[station.location.latitude, station.location.longitude]}
        >
          <Popup>
            <b>{station.name}</b><br />
            Status: {station.status}<br />
            Power: {station.power} KW<br />
            Connector: {station.connector}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
