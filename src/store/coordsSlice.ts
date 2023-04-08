import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    from: '',
    to: '',
}

export const coordsSlice = createSlice({
    name: 'coords',
    initialState,
    reducers: {
        setFrom: (state, action) => {
            state.from = action.payload
        },
        setTo: (state, action) => {
            state.to = action.payload
        }
    }
})

export const { setFrom, setTo } = coordsSlice.actions