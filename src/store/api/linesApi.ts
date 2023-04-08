import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DirectionsParams } from '../../types'


export const linesApi = createApi({
    reducerPath: 'linesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getDirections: builder.query({
            query: ({ profile, coordinates }: DirectionsParams) => `directions/${profile}/${coordinates}`,
        })
    })
})


export const { useGetDirectionsQuery } = linesApi
