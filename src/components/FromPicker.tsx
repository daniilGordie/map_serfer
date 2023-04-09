import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTo } from "../store/coordsSlice";
import { useNameToCoordsQuery } from "../store/api/linesApi";

export function FromPicker() {

    const dispatch = useDispatch();
    const [fromQuery, setFromQuery] = useState<string>('');
    const [showResults, setShowResults] = useState<boolean>(false);
    const { data, error, isLoading } = useNameToCoordsQuery(fromQuery);



    return (
        <div>
            <label>From: </label>
            <input placeholder='from' className='m-5' onChange={e => { setFromQuery(e.target.value); setShowResults(true) }} />
            {
                showResults && data &&
                data.features?.map((feature) => {
                    return (
                        <div key={feature.place_name} onClick={(e) => {
                            dispatch(setFrom(feature))
                            setShowResults(false)
                        }}>
                            <p>{feature.place_name?.slice(0, 40)}</p>
                        </div>
                    )
                })
            }
        </div>
    )

}
