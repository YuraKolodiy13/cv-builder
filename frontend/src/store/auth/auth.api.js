import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'reqres/api',
  tagTypes: ['Users', 'Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5222/auth/'
  }),
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Users']
    }),
    signUp: build.mutation({
      query: (body) => ({
        url: 'registration',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Users']
    }),
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
} = authApi;