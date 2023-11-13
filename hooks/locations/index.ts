// import { api } from '@/config/api'
// import { TDetailLocation, TLocations } from '@/types/locations'
// import { TErrorResponse } from '@/types'
// import { UseQueryResult, useQuery } from '@tanstack/react-query'

// export const getLocations = async (page: number = 1): Promise<TLocations> => {
//   const { data } = await api.get(`/location?page=${page}`)

//   return data
// }

// export const getDetailLocation = async (
//   id: string
// ): Promise<TDetailLocation> => {
//   const { data } = await api.get(`/location/${id}`)

//   return data
// }

// export const useGetLocations = (): UseQueryResult<
//   TLocations,
//   TErrorResponse
// > => {
//   const options = {
//     queryKey: ['locations'],
//     queryFn: async () => await getLocations(),
//   }

//   return useQuery(options)
// }

// export const useGetDetailLocation = (
//   id: string
// ): UseQueryResult<TDetailLocation, TErrorResponse> => {
//   const options = {
//     queryKey: ['detailLocation', id],
//     queryFn: async () => await getDetailLocation(id),
//   }

//   return useQuery(options)
// }
