import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, BookOpen, Droplet } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const assessmentIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-cyan.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const iksIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationMarker {
  id: number | string;
  lat: number;
  lng: number;
  title: string;
  type: 'ASSESSMENT' | 'IKS_HERITAGE';
  district: string;
  state: string;
  details?: string;
  score?: number;
}

interface GisMapComponentProps {
  markers?: LocationMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export const GisMapComponent: React.FC<GisMapComponentProps> = ({
  markers = [
    { id: 1, lat: 11.0168, lng: 76.9558, title: "Coimbatore RWH Assessment", type: "ASSESSMENT", district: "Coimbatore", state: "Tamil Nadu", score: 86, details: "Harvesting Potential: 344,000 L/yr" },
    { id: 2, lat: 10.9982, lng: 77.0258, title: "Singanallur Eri Heritage Tank", type: "IKS_HERITAGE", district: "Coimbatore", state: "Tamil Nadu", details: "Traditional South Indian Cascading Eri (1.5M m³)" },
    { id: 3, lat: 13.0850, lng: 80.2101, title: "Anna Nagar Urban Assessment", type: "ASSESSMENT", district: "Chennai", state: "Tamil Nadu", score: 68, details: "Rooftop Tank Storage: 192,000 L/yr" },
    { id: 4, lat: 27.0072, lng: 76.6062, title: "Chand Baori Stepwell", type: "IKS_HERITAGE", district: "Dausa", state: "Rajasthan", details: "3,500 narrow step traditional Baoli cistern" },
  ],
  center = [11.0168, 76.9558],
  zoom = 7,
  height = "450px"
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl" style={{ height }}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%', background: '#020617' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={m.type === 'IKS_HERITAGE' ? iksIcon : assessmentIcon}>
            <Popup className="custom-leaflet-popup">
              <div className="p-2 space-y-1 text-slate-900 font-sans max-w-xs">
                <div className="flex items-center space-x-1.5 font-bold text-xs">
                  {m.type === 'IKS_HERITAGE' ? (
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <Droplet className="w-3.5 h-3.5 text-cyan-600" />
                  )}
                  <span>{m.title}</span>
                </div>
                <p className="text-[11px] text-slate-600">{m.district}, {m.state}</p>
                {m.details && <p className="text-[11px] font-medium text-slate-800">{m.details}</p>}
                {m.score && (
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                    Recharge Score: {m.score}/100
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
