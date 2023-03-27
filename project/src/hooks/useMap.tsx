import { useRef, useState, useEffect, MutableRefObject } from 'react';
import leaflet, { Map } from 'leaflet';
import { CityCoordsProp } from '../types/type-store';

function useMap(mapRef: MutableRefObject<null>, city: CityCoordsProp) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(instance);

      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
