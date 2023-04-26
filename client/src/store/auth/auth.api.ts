import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuthResponse, ISignIn, ISignUp} from "../../interfaces";

const API = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: 'auth/api',
  tagTypes: ['Users', 'Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}auth/`
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