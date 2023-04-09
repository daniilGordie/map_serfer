import mapboxgl, { Marker } from 'mapbox-gl';
import { Route, Waypoint } from '../types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { decodePolyline } from '../utils/decodePolyline';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapComponentProps {
    from: Waypoint,
    to: Waypoint,
    route: Route
}

export function MapComponent() {
    const { from, to, route, profile } = useSelector((state: any) => state.coords);
    const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraXRhLWdyeW5jaCIsImEiOiJjbGc3c3RrZnIwcXJrM3VwZHVpOGV6bGM3In0.-3pH-Qz2ddj8fi_Fh91sRQ";

    mapboxgl.accessToken = MAPBOX_TOKEN;
    let map: mapboxgl.Map;
    useEffect(() => {
        map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/mapbox/navigation-day-v1',
            center: [0, 0],
            zoom: 3,
        });

        map.on('styles.load', () => {
            if (!from.center || !to.center || !route?.geometry) return;

            new Marker().setLngLat(from.center).addTo(map);
            new Marker().setLngLat(to.center).addTo(map);



            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': decodePolyline(route?.geometry, false),
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#4400ff',
                    'line-width': 8
                }
            });
        });

    }, [])






    return (<></>)


}