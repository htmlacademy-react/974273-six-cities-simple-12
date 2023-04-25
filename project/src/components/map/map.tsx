import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { URL_MARKER_DEFAULT } from '../../data-store/data-const';
import { MapProps } from '../../types/type-store';
import { useAppSelector } from '../../hooks';
import leaflet from 'leaflet';
import useMap from '../../hooks/useMap';
import cn from 'classnames';
import Marker from './marker.svg';
import { getMarkerColor } from '../../store/main-process/selectors';

function Map({ points, room, isMapBig }: MapProps) {

  let markerColor = useAppSelector(getMarkerColor);
  const cityCenter = points[0].city;

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityCenter);

  if (room) {
    points = [...points, room];

    markerColor = room.id;
  }

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: Marker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

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
          icon: point.id === markerColor ? currentCustomIcon : defaultCustomIcon,
        }).addTo(map);
      });
    }
  }, [map, points, isMapBig, currentCustomIcon, defaultCustomIcon, cityCenter, markerColor, mapRef]);

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
