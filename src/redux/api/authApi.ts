import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envs from '@/env.config';
import type { UserInterface,AuthResponse, LoginRequest, RegisterRequest, RefreshRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/types/user.type';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${envs.API_BASE_URL}/api/auth`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation<AuthResponse, RefreshRequest>({
        query: (data) => ({
            url: '/refresh',
            method: 'POST',
            body: data
        })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query<UserInterface, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
        query: (data) => ({
            url: '/forgot-password',
            method: 'POST',
            body: data
        })
    }),
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
        query: (data) => ({
            url: '/reset-password',
            method: 'POST',
            body: data
        })
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
