import { configureStore } from '@reduxjs/toolkit'
import { linesApi } from './api/linesApi'

export const store = configureStore({
    reducer: {
        "linesApi": linesApi.reducer 
    },
})


