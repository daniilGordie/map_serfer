import { useSelector } from "react-redux"


export function Description() {

    const { from, to, route } = useSelector((state: any) => state.coords);


    return (
        <>
        </>

    )
}