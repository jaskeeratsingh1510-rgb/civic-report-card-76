import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getWardResults, type WardResult } from "@/data/candidates";

interface MumbaiMapProps {
  viewMode: "electoral" | "plain" | "results";
  searchQuery: string;
  onWardHover: (ward: number | null, result?: WardResult) => void;
  onWardClick: (ward: number) => void;
}

// Mumbai ward polygon data - simplified representation of 227 electoral wards
// Organized roughly from North to South along the peninsula
const generateMumbaiWardPolygons = () => {
  const wards: { ward: number; coords: [number, number][] }[] = [];
  
  // Mumbai spans roughly from 18.89°N to 19.27°N and 72.77°E to 72.98°E
  const baseLatNorth = 19.27;
  const baseLatSouth = 18.89;
  const baseLngWest = 72.77;
  const baseLngEast = 72.98;
  
  const latRange = baseLatNorth - baseLatSouth;
  const lngRange = baseLngEast - baseLngWest;
  
  // Create a grid-like distribution of wards
  const rows = 23;
  const colsBase = 10;
  
  let wardNum = 1;
  
  for (let row = 0; row < rows && wardNum <= 227; row++) {
    // Vary columns based on Mumbai's shape (narrower in south, wider in middle)
    let cols = colsBase;
    if (row < 5) cols = Math.min(6 + row, 10);
    else if (row > 18) cols = Math.max(10 - (row - 18) * 2, 4);
    
    const rowHeight = latRange / rows;
    const colWidth = lngRange / cols;
    
    const latStart = baseLatNorth - (row * rowHeight);
    
    for (let col = 0; col < cols && wardNum <= 227; col++) {
      // Add some offset for western wards (Mumbai coastline)
      const westOffset = (row > 10 ? (row - 10) * 0.003 : 0);
      const lngStart = baseLngWest + westOffset + (col * colWidth);
      
      // Create polygon with slight randomization for natural look
      const jitter = 0.002;
      const coords: [number, number][] = [
        [latStart - Math.random() * jitter, lngStart + Math.random() * jitter],
        [latStart - Math.random() * jitter, lngStart + colWidth - Math.random() * jitter],
        [latStart - rowHeight + Math.random() * jitter, lngStart + colWidth - Math.random() * jitter],
        [latStart - rowHeight + Math.random() * jitter, lngStart + Math.random() * jitter],
        [latStart - Math.random() * jitter, lngStart + Math.random() * jitter], // Close polygon
      ];
      
      wards.push({ ward: wardNum, coords });
      wardNum++;
    }
  }
  
  return wards;
};

const WARD_POLYGONS = generateMumbaiWardPolygons();

const partyColors: Record<string, string> = {
  "BJP": "#FF9933",
  "SS (UBT)": "#FF6B00",
  "SS": "#FF6B00",
  "INC": "#00BFFF",
  "AIMIM": "#008000",
  "MNS": "#FFD700",
  "NCP": "#00008B",
  "SP": "#FF0000",
  "NCP (SP)": "#004225",
  "IND": "#808080",
};

const MumbaiMap = ({ viewMode, searchQuery, onWardHover, onWardClick }: MumbaiMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.GeoJSON | null>(null);
  const [wardResults] = useState(() => getWardResults());

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Mumbai
    const map = L.map(mapContainerRef.current, {
      center: [19.076, 72.877],
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
      zoomControl: false,
    });

    // Add CARTO light basemap
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Add custom zoom control to bottom left
    L.control.zoom({ position: "bottomleft" }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing layers
    if (layersRef.current) {
      mapRef.current.removeLayer(layersRef.current);
    }

    // Create GeoJSON features for each ward
    const features = WARD_POLYGONS.map(({ ward, coords }) => {
      const result = wardResults.find((w) => w.ward === ward);
      return {
        type: "Feature" as const,
        properties: {
          ward,
          result,
          name: result?.wardName || `Ward ${ward}`,
        },
        geometry: {
          type: "Polygon" as const,
          coordinates: [coords.map(([lat, lng]) => [lng, lat])], // GeoJSON uses [lng, lat]
        },
      };
    });

    const matchesSearch = (ward: number, result?: WardResult) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        ward.toString().includes(query) ||
        result?.wardName.toLowerCase().includes(query) ||
        result?.winner.name.toLowerCase().includes(query)
      );
    };

    const getWardStyle = (ward: number, result?: WardResult, isHovered = false) => {
      const matches = matchesSearch(ward, result);
      const opacity = matches ? 1 : 0.3;
      
      let fillColor = "#e2e8f0"; // secondary color
      let fillOpacity = 0.6;
      
      if (viewMode === "results" && result) {
        fillColor = partyColors[result.winner.partyShort] || "#808080";
        fillOpacity = 0.8;
      } else if (viewMode === "electoral") {
        fillColor = "#f1f5f9";
        fillOpacity = 0.7;
      } else {
        fillColor = "transparent";
        fillOpacity = 0.1;
      }
      
      return {
        color: isHovered ? "#f97316" : "#64748b",
        weight: isHovered ? 3 : 1,
        opacity: opacity,
        fillColor,
        fillOpacity: fillOpacity * opacity,
      };
    };

    const geoJsonLayer = L.geoJSON(
      { type: "FeatureCollection", features } as GeoJSON.FeatureCollection,
      {
        style: (feature) => {
          const ward = feature?.properties?.ward;
          const result = feature?.properties?.result;
          return getWardStyle(ward, result);
        },
        onEachFeature: (feature, layer) => {
          const ward = feature.properties.ward;
          const result = feature.properties.result;

          // Add ward number label
          const center = (layer as L.Polygon).getBounds().getCenter();
          const label = L.divIcon({
            className: "ward-label",
            html: `<span class="text-[10px] font-medium text-foreground/70">${ward}</span>`,
            iconSize: [30, 20],
            iconAnchor: [15, 10],
          });
          L.marker(center, { icon: label, interactive: false }).addTo(mapRef.current!);

          layer.on({
            mouseover: () => {
              (layer as L.Path).setStyle(getWardStyle(ward, result, true));
              if ((layer as L.Path).bringToFront) {
                (layer as L.Path).bringToFront();
              }
              onWardHover(ward, result);
            },
            mouseout: () => {
              (layer as L.Path).setStyle(getWardStyle(ward, result, false));
              onWardHover(null);
            },
            click: () => {
              onWardClick(ward);
            },
          });

          // Tooltip
          layer.bindTooltip(
            `<div class="font-medium">Ward ${ward}</div><div class="text-xs opacity-70">${result?.wardName || ""}</div>`,
            { sticky: true, className: "ward-tooltip" }
          );
        },
      }
    );

    geoJsonLayer.addTo(mapRef.current);
    layersRef.current = geoJsonLayer;

  }, [viewMode, searchQuery, wardResults, onWardHover, onWardClick]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[calc(100vh-8rem)]"
      style={{ background: "#f8fafc" }}
    />
  );
};

export default MumbaiMap;
