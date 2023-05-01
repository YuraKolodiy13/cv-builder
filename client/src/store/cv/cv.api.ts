import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICvBuilder, ICvBuilderState, ICvQuery} from "../../interfaces";
import {RootState} from "../index";

interface ICvBuilderRes {
  data: ICvBuilder[];
  total: number;
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const cvApi = createApi({
  reducerPath: 'cv/api',
  tagTypes: ['CVs'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).auth.user
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user.token}`)
      }
      return headers
    },
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
    updateCV: build.mutation<ICvBuilderState, ICvBuilder>({
      query: (body) => ({
        url: `cv/${body._id}`,
        method: 'PUT',
        body
      }),
    }),
    deleteCV: build.mutation<ICvBuilderState, number>({
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