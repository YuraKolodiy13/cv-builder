import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICvBuilder, ICvBuilderState, ICvQuery} from "../../interfaces";

interface ICvBuilderRes {
  data: ICvBuilder[];
  total: number;
}

export const cvApi = createApi({
  reducerPath: 'cv/api',
  tagTypes: ['CVs'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5222/'
  }),
  endpoints: (build) => ({
    createCV: build.mutation<ICvBuilderState, ICvBuilderState>({
      query: (body) => ({
        url: 'cv',
        method: 'POST',
        body
      }),
    }),
    getCVs: build.query<ICvBuilderRes, ICvQuery>({
      query: (params) => ({
        url: 'cv',
        params: params
      }),
      providesTags: () =>  ['CVs'],
    }),
    getCV: build.query<ICvBuilder, string>({
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
    }),
    deleteCV: build.mutation({
      query: (id) => ({
        url: `cv/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CVs']
    }),
  }),
})

export const {
  useCreateCVMutation,
  useGetCVsQuery,
  useGetCVQuery,
  useUpdateCVMutation,
  useDeleteCVMutation,
} = cvApi;