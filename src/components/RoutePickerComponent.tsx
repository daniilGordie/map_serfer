import { useState } from "react";
import { Direction, Route } from "../types";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/coordsSlice";

interface RoutePickerComponentProps {
    direction: Direction | undefined
}

export function RoutePickerComponent({ direction }: RoutePickerComponentProps) {
    if (!direction?.routes) return (
        <>
            <h1>{direction?.message}</h1>
        </>
    )
    const dispatch = useDispatch();

    return (
        <div className="flex m-3 justify-center items-center">
            <p>Routes: </p>
            {direction.routes?.map((route: Route, index) => {
                return (
                    <div className={`m-2 dark:bg-slate-700 bg-pink-100 p-4 px-6 rounded-full cursor-pointer hover:bg-pink-400 dark:hover:bg-slate-900 `}
                        key={route.geometry}
                        onClick={() => { dispatch(setRoute(route)); }}>{index + 1}</div>
                )
            })}
        </div>
    )
}