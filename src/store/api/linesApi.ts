import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Direction, DirectionsParams } from '../../types'


export const linesApi = createApi({
    reducerPath: 'linesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7167' }),
    endpoints: (builder) => ({
        getDirections: builder.query<Direction,DirectionsParams>({
            query: ({ profile, coordinates }: DirectionsParams) => `Directions/${profile}/${coordinates}`,
        })
    })
})


export const { useGetDirectionsQuery } = linesApi
