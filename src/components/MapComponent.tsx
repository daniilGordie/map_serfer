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
    const [geometries, setGeometries] = useState<string[]>([]);
    const [markers, setMarkers] = useState<string[]>([]);

    mapboxgl.accessToken = MAPBOX_TOKEN;
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

        if (from.center && !markers.includes(from.center)) {
            new Marker().setLngLat(from.center).addTo(map);
            map.flyTo({
                center: from.center,
                essential: true,
                zoom: 5
            });
        }
        if (to.center) {
            new Marker().setLngLat(to.center).addTo(map);
        }

        if (route?.geometry && !geometries.includes(route?.geometry)) {
            setGeometries([...geometries, route?.geometry]);
            route?.geometry && map.addSource(route?.geometry + from.center + to.center, {
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
                'id': route?.geometry + from.center + to.center,
                'type': 'line',
                'source': route?.geometry + from.center + to.center,
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': getLineColor(profile),
                    'line-width': 8
                }
            });
        }

    }, [isMapLoaded, from, to, route])


    return (<></>)
}

function getLineColor(profile: string) {
    switch (profile) {
        case "driving":
            return "#f47089";
        case "driving-traffic":
            return "#68c7d9";
        case "walking":
            return "#ffaeae";
        case "cycling":
            return "#a3d3e5";
        default:
            return "#f47089";
    }
}


