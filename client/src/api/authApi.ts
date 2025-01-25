import { apiSlice } from '@/store/apiSlice';
import { IUser, IUserLoginInfo, IUserLoginResponse } from '@/types/user.types';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //loginUser:builder.query<resultType,QueryArguments>
    loginUser: builder.mutation<IUserLoginResponse, IUserLoginInfo>({
      query: (body) => ({ url: `/login`, method: 'POST', body: body }),
      invalidatesTags: ['Auth'],
    }),
    
    //registerUser:builder.query<resultType,QueryArguments>
    registerUser: builder.mutation<IUser, IUser>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Auth'],
    }),

    logOutUser: builder.mutation<IUser, { email: string; token: string }>({
      query: (body) => ({
        url: '/logout',
        method: 'POST',
        body: body.email,
        headers: { Authorization: 'Bearer ' + body.token },
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
} = authApi;