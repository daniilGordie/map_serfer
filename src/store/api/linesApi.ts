import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DirectionsParams } from '../../types'


export const linesApi = createApi({
    reducerPath: 'linesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7167' }),
    endpoints: (builder) => ({
        getDirections: builder.query({
            query: ({ profile, coordinates }: DirectionsParams) => `Directions/${profile}/${coordinates}`,
        })
    })
})


export const { useGetDirectionsQuery } = linesApi
