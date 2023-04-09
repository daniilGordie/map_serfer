import React, { useState, useEffect, useRef } from 'react';
import { useGetDirectionsQuery, useNameToCoordsQuery } from '../store/api/linesApi';
import { Direction, DirectionsParams } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { setFrom, setTo, setProfile } from '../store/coordsSlice';
import { MapComponent } from '../components/MapComponent';
import { RoutePickerComponent } from '../components/RoutePickerComponent';
import { FromPicker } from '../components/FromPicker';
import { ToPicker } from '../components/ToPicker';
import { ChangeTheme } from '../components/ChangeTheme';

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
        <div className=" flex flex-col items-center justify-center">
            <div className='flex m-10 items-start'>
                <select className='dark:bg-slate-700 bg-pink-100 p-2 rounded m-5'
                    onChange={(e) => { dispatch(setProfile(e.target.value)) }}>
                    <option>driving</option>
                    <option>driving-traffic</option>
                    <option>walking</option>
                    <option>cycling</option>
                </select>
                <FromPicker />
                <ToPicker />
                <ChangeTheme />
            </div>
            <RoutePickerComponent routes={data?.routes} />
            <div id="map" className='w-[90%]  h-[600px]'></div>
            <MapComponent />
        </div>
    )
}
