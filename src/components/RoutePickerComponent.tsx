import { useState } from "react";
import { Route } from "../types";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/coordsSlice";

interface RoutePickerComponentProps {
    routes: Route[] | undefined
}

export function RoutePickerComponent({ routes }: RoutePickerComponentProps) {
    const [selectedRoute, setSelectedRoute] = useState<number>(-1)
    if (!routes) return (<></>)
    const dispatch = useDispatch();

    return (
        <div className="flex m-3 justify-center items-center">
            <p>Routes: </p>
            {routes?.map((route: Route, index) => {
                return (
                    <div className={`m-2 dark:bg-slate-700 bg-pink-100 p-4 px-6 rounded-full cursor-pointer hover:bg-pink-400 dark:hover:bg-slate-900 ${selectedRoute == index ? 'border-pink-500 border-2' : ''}}`}
                        key={route.geometry}
                        onClick={() => { dispatch(setRoute(route)); setSelectedRoute(index) }}>{index + 1}</div>
                )
            })}
        </div>
    )
}