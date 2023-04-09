import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    from: [],
    to: [],
    profile: 'driving',
    route: undefined,
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
        },
        setRoute: (state, action) => {
            state.route = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        }

    }
})

export const { setFrom, setTo, setRoute, setProfile } = coordsSlice.actions