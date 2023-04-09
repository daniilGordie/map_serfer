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

        if (from.coordinates && !markers.includes(from.coordinates)) {
            new Marker().setLngLat(from.coordinates).addTo(map);
            map.flyTo({
                center: from.coordinates,
                essential: true,
                zoom: 5
            });
        }
        if (to.coordinates) {
            new Marker().setLngLat(to.coordinates).addTo(map);
        }

        if (route?.geometry && !geometries.includes(route?.geometry)) {
            setGeometries([...geometries, route?.geometry]);
            route?.geometry && map.addSource(route?.geometry + from.coordinates + to.coordinates, {
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
                'id': route?.geometry + from.coordinates + to.coordinates,
                'type': 'line',
                'source': route?.geometry + from.coordinates + to.coordinates,
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


