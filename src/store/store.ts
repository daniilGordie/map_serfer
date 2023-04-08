import { configureStore } from '@reduxjs/toolkit'
import { linesApi } from './api/linesApi'
import { coordsSlice } from './coordsSlice'

export const store = configureStore({
    reducer: {
        "linesApi": linesApi.reducer,
        "coords": coordsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(linesApi.middleware)
})


