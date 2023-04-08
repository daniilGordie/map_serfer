import React, { useState, useEffect, useRef } from 'react';
import { useGetDirectionsQuery } from '../store/api/linesApi';
import { Direction, DirectionsParams } from '../types';
// import Map from 'react-map-gl'
import mapboxgl from 'mapbox-gl';
import { getMarkers } from '../utils/getMarkers';
import { decodePolyline } from '../utils/decodePolyline';

export function Home() {

    const [from, setFrom] = useState('-118.243683,34.052235');
    const [to, setTo] = useState('-122.419416,37.774929');
    const [profile, setProfile] = useState('driving');
    const { data, error, isLoading } = useGetDirectionsQuery({ profile, coordinates: `${from};${to}` } as DirectionsParams);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!isLoading) {
            mapboxgl.accessToken = '';
            const map = new mapboxgl.Map({
                container: "map",
                style: 'mapbox://styles/mapbox/navigation-day-v1',
                center: [0, 0],
                zoom: 3,
            });
            const marker = new mapboxgl.Marker()
                .setLngLat([-118.243683, 34.052235])
                .addTo(map);


            // map.on("style.load", () => {

            //     map.addSource('route', {
            //         type: 'geojson',
            //         data: {
            //             type: 'Feature',
            //             properties: {

            //             },
            //             geometry: {
            //                 type: 'LineString',
            //                 coordinates: decodePolyline("czynEhmupU{Sj_@wY_Y[b@cfPzzWwi_@xvUmnBtoB}xdAvxu@scLns@_hIpdPaoe@jgL}gmBb}_Cm~x@bql@anh@v}q@qqoAfjaAuuXxg_@or~AheoAsxbAto]otXfw]cu[rkj@vmHzqgB{mPxlNgeHdaUn}IpuVrHpz@}Lnn@iBiCeEqFwHoK", false)
            //             }
            //         }
            //     });

            //     map.addLayer({
            //         id: 'route',
            //         type: 'line',
            //         source: 'route',
            //         paint: {
            //             'line-color': '#0074D9', // Replace with your desired route color
            //             'line-width': 4 // Replace with your desired route width
            //         }
            //     });

               
            // });

            const markers = getMarkers(data as Direction);
            console.log(markers);
            console.log(data);
        }

    }, [isLoading]);

    return (
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <div>
                <select onChange={(e) => { setProfile(e.target.value) }}>
                    <option>driving</option>
                    <option>driving-traffic</option>
                    <option>walking</option>
                    <option>cycling</option>
                </select>
                <label>From:</label>
                <input placeholder='from' onChange={e => { setFrom(e.target.value) }} ></input>
                <input placeholder='to' onChange={e => { setTo(e.target.value) }} ></input>
            </div>
            <div id="map" className='w-[800px] h-[600px]'></div>
            {/* <p>{data}</p> */}

        </div>
    )
}

