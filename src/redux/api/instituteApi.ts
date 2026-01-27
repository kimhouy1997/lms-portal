import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envs from '@/env.config';
import type { InstituteInterface, CreateInstituteRequest, UpdateInstituteRequest } from '@/types/institute.type';

export const instituteApi = createApi({
  reducerPath: 'instituteApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${envs.API_BASE_URL}/api/organization/institutes`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
  }),
  tagTypes: ['Institute'],
  endpoints: (builder) => ({
    getInstitutes: builder.query<InstituteInterface[], void>({
      query: () => '/',
      providesTags: ['Institute'],
    }),
    getInstituteById: builder.query<InstituteInterface, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Institute', id }],
    }),
    createInstitute: builder.mutation<InstituteInterface, CreateInstituteRequest>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Institute'],
    }),
    updateInstitute: builder.mutation<InstituteInterface, UpdateInstituteRequest>({
      query: ({ id, ...data }) => ({
        url: `/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Institute', { type: 'Institute', id }],
    }),
    deleteInstitute: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Institute'],
    }),
  }),
});

export const {
  useGetInstitutesQuery,
  useGetInstituteByIdQuery,
  useCreateInstituteMutation,
  useUpdateInstituteMutation,
  useDeleteInstituteMutation,
} = instituteApi;
