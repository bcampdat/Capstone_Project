import React from "react";
import MyMap from "../components/Mymap";

export default function Mapas() {
  return (
    <div className="map-container">
      <div className="map w-full h-full shadow-lg border-3 border-amber-400 rounded-lg mt-6">
        <MyMap />
      </div>
    </div>
  );
}
