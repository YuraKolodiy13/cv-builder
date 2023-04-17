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
      query: ({page, limit}) => ({
        url: 'cv',
        params: {page, limit}
      }),
    }),
    getCV: build.query({
      query: (id) => ({
        url: `cv/${id}`,
      }),
    })
  }),
})

export const {
  useCreateCVMutation,
  useGetCVsQuery,
  useGetCVQuery,
} = cvApi;