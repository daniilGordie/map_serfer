import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Direction, DirectionsParams, FeatureCollection } from '../../types'


export const linesApi = createApi({
    reducerPath: 'linesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7167' }),
    endpoints: (builder) => ({
        getDirections: builder.query<Direction, DirectionsParams>({
            query: ({ profile, coordinates }: DirectionsParams) => `Directions/${profile}/${coordinates}`,
            transformResponse: (response: any) => JSON.parse(response)
        }),
        nameToCoords: builder.query<FeatureCollection, string>({
            query: (name: string) => `PlacesByName/${name}`,
            transformResponse: (response: any) => JSON.parse(response)
        }),


    })


})


export const { useGetDirectionsQuery,useNameToCoordsQuery } = linesApi
