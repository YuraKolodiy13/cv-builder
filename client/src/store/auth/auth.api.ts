import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuthResponse, ISignIn, ISignUp} from "../../interfaces";

export const authApi = createApi({
  reducerPath: 'auth/api',
  tagTypes: ['Users', 'Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5222/auth/'
  }),
  endpoints: (build) => ({
    signIn: build.mutation<IAuthResponse, ISignIn>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Users']
    }),
    signUp: build.mutation<IAuthResponse, ISignUp>({
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