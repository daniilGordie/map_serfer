import React, { useState, useEffect } from 'react';
import { useGetDirectionsQuery } from '../store/api/linesApi';
import { DirectionsParams } from '../types';

export function Home() {

    const [from, setFrom] = useState('-118.243683,34.052235');
    const [to, setTo] = useState('-122.419416,37.774929');
    const [profile, setProfile] = useState('driving');
    const { data, error, isLoading } = useGetDirectionsQuery({ profile, coordinates: `${from};${to}` } as DirectionsParams);

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <select onChange={(e) => { setProfile(e.target.value) }}>
                <option>driving</option>
                <option>driving-traffic</option>
                <option>walking</option>
                <option>cycling</option>
            </select>
            <input placeholder='from' onChange={e => { setFrom(e.target.value) }} value={"-118.243683,34.052235"}></input>
            <input placeholder='to' onChange={e => { setTo(e.target.value) }} value={"-122.419416,37.774929"}></input>
            <p>{data}</p>
        </div>
    )
}

