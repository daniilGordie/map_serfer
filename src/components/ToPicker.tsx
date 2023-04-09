import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrom, setTo } from "../store/coordsSlice";
import { useNameToCoordsQuery } from "../store/api/linesApi";

export function ToPicker() {

    const dispatch = useDispatch();
    const [toQuery, setToQuery] = useState<string>('');
    const { data, error, isLoading } = useNameToCoordsQuery(toQuery);
    const [showResults, setShowResults] = useState<boolean>(false);

    

    return (
        <div>
            <label>To: </label>
            <input placeholder='To' className='m-5' onChange={e => { setToQuery(e.target.value); setShowResults(true) }} />
            {
                showResults && data &&
                data.features?.map((feature) => {
                    return (
                        <div key={feature.place_name} onClick={(e) => {
                            dispatch(setTo(feature))
                            setShowResults(false)
                        }}>
                            <p>{feature.place_name?.slice(0,40)}</p>
                        </div>
                    )
                })
            }
        </div>
    )

}
