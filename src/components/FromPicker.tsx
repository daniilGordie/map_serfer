import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTo } from "../store/coordsSlice";
import { useNameToCoordsQuery } from "../store/api/linesApi";

export function FromPicker() {

    const dispatch = useDispatch();
    const { from } = useSelector((state: any) => state.coords);
    const [fromQuery, setFromQuery] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const { data, error, isLoading } = useNameToCoordsQuery(fromQuery);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fromQuery.length == 0) setShowResults(false)
    }, [fromQuery])

    return (
        <div className="m-5">
            <label className="mr-2">From: </label>
            <input placeholder='from' value={fromQuery} className='dark:bg-slate-700 bg-pink-100 p-2 rounded' onChange={e => { setFromQuery(e.target.value); setShowResults(true); }} />
            {
                showResults && data &&
                data.places?.map((place) => {
                    return (
                        <div className="m-1"
                            key={place.place_name} onClick={(e) => {
                                dispatch(setFrom(place))
                                setShowResults(false)
                                setFromQuery(place.place_name||"")
                            }}>
                            <p className="cursor-pointer hover:bg-pink-100 dark:hover:bg-slate-700 p-1 rounded">{place.place_name?.slice(0, 40)}</p>
                        </div>
                    )
                })
            }
        </div>
    )

}
