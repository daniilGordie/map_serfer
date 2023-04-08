import { useState } from 'react';
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

interface MapComponentProps {
    viewState: any;
}

export function MapComponent() {

    const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraXRhLWdyeW5jaCIsImEiOiJjbGc3c3RrZnIwcXJrM3VwZHVpOGV6bGM3In0.-3pH-Qz2ddj8fi_Fh91sRQ";
    const [viewState, setViewState] = useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14
    });
    const handleMove = (evt: any) => {
        setViewState(evt.viewState);
    };

    return (
        <Map
            {...viewState}
            onMove={handleMove}
            style={{ width: 800, height: 600 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker longitude={-122.4} latitude={37.8} color="red" />
        </Map>
    )

}