import { Route } from "../types";
import { useDispatch } from "react-redux";
import { setRoute } from "../store/coordsSlice";

interface RoutePickerComponentProps {
    routes: Route[] | undefined
}

export function RoutePickerComponent({ routes }: RoutePickerComponentProps) {
    if (!routes) return (<></>)
    const dispatch = useDispatch();

    return (
        <div>
            {routes?.map((route: Route, index) => {
                return (
                    <div key={route.geometry}
                        onClick={() => { dispatch(setRoute(route)) }}>{route.geometry}</div>
                )
            })}
        </div>
    )
}