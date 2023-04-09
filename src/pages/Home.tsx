import React, { useState, useEffect, useRef } from 'react';
import { useGetDirectionsQuery, useNameToCoordsQuery } from '../store/api/linesApi';
import { Direction, DirectionsParams } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { setFrom, setTo, setProfile } from '../store/coordsSlice';
import { MapComponent } from '../components/MapComponent';
import { RoutePickerComponent } from '../components/RoutePickerComponent';
import { FromPicker } from '../components/FromPicker';
import { ToPicker } from '../components/ToPicker';

export function Home() {


    const { from, to, route, profile } = useSelector((state: any) => state.coords);

    const dispatch = useDispatch();
    console.log(from, to, route, profile)

    const { data, error, isLoading } = useGetDirectionsQuery({ profile, coordinates: `${from.center};${to.center}` });

    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (error) {
        return <div>Error</div>
    }

    return (
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <div>
                <select onChange={(e) => { dispatch(setProfile(e.target.value)) }}>
                    <option>driving</option>
                    <option>driving-traffic</option>
                    <option>walking</option>
                    <option>cycling</option>
                </select>
                <FromPicker />
                <ToPicker />
            </div>
            <RoutePickerComponent routes={data?.routes} />
            <div id="map" className='w-[800px] h-[600px]'></div>
            <div>
                <p>{from.place_name}</p>
                <p>{to.place_name}</p>
                <p>{route?.geometry}</p>
                <p>{profile}</p>
            </div>
            <MapComponent />
        </div>
    )
}
