import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cvApi = createApi({
  reducerPath: 'cv/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5222/'
  }),
  endpoints: (build) => ({
    createCV: build.mutation({
      query: (body) => ({
        url: 'cv',
        method: 'POST',
        body
      }),
    }),
    getCVs: build.query({
      query: (params) => ({
        url: 'cv',
        params: params
      }),
    }),
    getCV: build.query({
      query: (id) => ({
        url: `cv/${id}`,
      }),
    }),
    updateCV: build.mutation({
      query: (body) => ({
        url: `cv/${body.id}`,
        method: 'PUT',
        body
      }),
    })
  }),
})

export const {
  useCreateCVMutation,
  useGetCVsQuery,
  useGetCVQuery,
  useUpdateCVMutation,
} = cvApi;