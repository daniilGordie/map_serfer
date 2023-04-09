import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTo } from "../store/coordsSlice";
import { useNameToCoordsQuery } from "../store/api/linesApi";

export function FromPicker() {

    const dispatch = useDispatch();
    const [fromQuery, setFromQuery] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const { data, error, isLoading } = useNameToCoordsQuery(fromQuery);

    useEffect(() => {
        if (fromQuery.length == 0) setShowResults(false)
    }, [fromQuery])

    return (
        <div className="m-5">
            <label className="mr-2">From: </label>
            <input placeholder='from' className='dark:bg-slate-700 bg-pink-100 p-2 rounded' onChange={e => { setFromQuery(e.target.value); setShowResults(true) }} />
            {
                showResults && data &&
                data.features?.map((feature) => {
                    return (
                        <div className="m-1"
                         key={feature.place_name} onClick={(e) => {
                            dispatch(setFrom(feature))
                            setShowResults(false)
                        }}>
                            <p className="cursor-pointer hover:bg-pink-100 dark:hover:bg-slate-700 p-1 rounded">{feature.place_name?.slice(0, 40)}</p>
                        </div>
                    )
                })
            }
        </div>
    )

}
