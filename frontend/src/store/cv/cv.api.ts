import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const cvApi = createApi({
  reducerPath: 'cv/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5221/'
  }),
  endpoints: (build) => ({
    createCV: build.mutation({
      query: (body) => ({
        url: 'cv',
        method: 'POST',
        body
      }),
    }),
  }),
})

export const {
  useCreateCVMutation,
} = cvApi;