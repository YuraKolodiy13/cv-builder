import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const commonApi = createApi({
  reducerPath: 'common/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}common/`,
  }),
  endpoints: (build) => ({
    getFonts: build.query({
      query: (params) => ({
        url: 'fonts',
        params: params
      }),
    }),
    getFont: build.query({
      query: (name) => ({
        url: `fonts/${name}`
      }),
    }),
  }),
})

export const {
  useLazyGetFontsQuery,
  useLazyGetFontQuery,
} = commonApi;