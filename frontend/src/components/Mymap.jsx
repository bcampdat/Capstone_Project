import React, { useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { UserContext } from './auth/userContext'; 

mapboxgl.accessToken = 'pk.eyJ1Ijoiamxwcm9mZXNvciIsImEiOiJjbHNhdHB3ZDEwNzNsMmpvNWxhMTRpNDNzIn0.b5FJ5Uz1mF4oCXB2YbTCJQ';

const MyMap = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(dibujarMapa);
      navigator.geolocation.watchPosition(actualizaMiPosicion);
    } else {
      alert('Tu navegador no permite geolocalizar');
    }

    function dibujarMapa(dataGeo) {
      const latitud = dataGeo.coords.latitude;
      const longitud = dataGeo.coords.longitude;

      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitud, latitud],
        zoom: 18,
        pitch: 60,
        bearing: -17.6,
        antialias: true
      });

      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });
      mapInstance.addControl(geocoder, 'top-left');

      const userName = user ? user.user_name : 'Usuario'; 
      const newMarker = new mapboxgl.Marker({ color: 'black' })
        .setLngLat([longitud, latitud])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${userName}</h3><p>Estoy aquí</p>`))
        .addTo(mapInstance);
      setMap(mapInstance);
      setMarker(newMarker);
    }

    function actualizaMiPosicion(dataGeo) {
      const latitud = dataGeo.coords.latitude;
      const longitud = dataGeo.coords.longitude;

      if (marker) {
        marker.setLngLat([longitud, latitud]);
        map.flyTo({ center: [longitud, latitud] });
      }
    }
  }, [marker, map, user]); 

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default MyMap;
