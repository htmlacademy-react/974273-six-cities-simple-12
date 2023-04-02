import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { URL_MARKER_DEFAULT } from '../../data-store/data-const';
import useMap from '../../hooks/useMap';
import { MapProps } from '../../types/type-store';
import cn from 'classnames';
// import { useAppSelector } from '../../hooks';

function Map({ points, isMapBig }: MapProps): JSX.Element {

  // const points = useAppSelector((state) => state.offers);
  const cityCenter = points[0].city;

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityCenter);

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
      map.setView({
        lat: cityCenter.location.latitude,
        lng: cityCenter.location.longitude,
      });
      points.forEach((point) => {
        leaflet.marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        }, {
          icon: defaultCustomIcon,
        }).addTo(map);
      });
    }
  }, [map, points, isMapBig, defaultCustomIcon, cityCenter]);

  return (
    <section
      className={cn(
        { 'property__map': isMapBig },
        { 'cities__map': !isMapBig },
        'map'
      )}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
