import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { URL_MARKER_DEFAULT } from '../../data-store/data-const';
import useMap from '../../hooks/useMap';
import { CardProps } from '../../types/type-store';

export type CityCoordsProp = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
}

type MapProps = {
  city: CityCoordsProp;
  points: CardProps[];
}

function Map({ city, points }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  // TODO: Добавить интерактивность маркеров для себя, для красоты.
  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_CURRENT,
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet.marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        }, {
          icon: defaultCustomIcon,
        }).addTo(map);
      });
    }
  }, [map, points]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
