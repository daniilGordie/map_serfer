import { useEffect, useState } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import { Route, Waypoint } from '../types';
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
    const [isMapLoaded, setIsMapLoaded] = useState<Boolean>(false);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);

    mapboxgl.accessToken = MAPBOX_TOKEN;
    // let map: mapboxgl.Map; 
    useEffect(() => {


        setMap((state: any) => {
            let map = new mapboxgl.Map({
                container: "map",
                style: 'mapbox://styles/mapbox/navigation-day-v1',
                center: [0, 0],
                zoom: 3,
            })
            map.on('load', () => {
                console.log("map loaded")
                setIsMapLoaded(true);
            });

            return map;
        });


    }, [])

    useEffect(() => {
        console.log("from", from, "to", to, "route", route, "isMapLoaded", isMapLoaded, "map", map)
        if (!isMapLoaded || !map) return;

        from.center && new Marker().setLngLat(from.center).addTo(map);
        to.center && new Marker().setLngLat(to.center).addTo(map);



        route?.geometry && map.addSource('route', {
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
        route?.geometry && console.log(decodePolyline(route?.geometry, false))

        route?.geometry && map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#f47089',
                'line-width': 8
            }
        });
    }, [isMapLoaded, from, to, route])






    return (<></>)


}