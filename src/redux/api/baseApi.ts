import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envs from '@/env.config';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${envs.API_BASE_URL}/api/${envs.API_VERSION}/`,
    prepareHeaders: (headers) => {
      // Add any custom headers like Authorization
      // const token = (getState() as RootState).auth.token;
      // if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Course', 'User'],
  endpoints: (builder) => ({
    // Sample RTK Request: Get All Courses
    getCourses: builder.query<any, void>({
      query: () => 'courses',
      providesTags: ['Course'],
    }),
    // Sample RTK Request: Get Course Detail
    getCourseById: builder.query<any, string>({
      query: (id) => `courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = baseApi;
