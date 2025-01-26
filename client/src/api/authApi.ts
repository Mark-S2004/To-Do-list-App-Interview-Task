import { apiSlice } from "@/store/apiSlice"
import { setUser } from "@/store/loggedUserSlice"
import { IUser, IUserLoginInfo, IUserLoginResponse } from "@/types/user.types"

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUserLoginResponse, IUserLoginInfo>({
      query: (credentials) => ({
        url: `/login`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
        } catch (error) {
          console.log(`Error on loginUser api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Auth"],
    }),

    registerUser: builder.mutation<IUser, IUser>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logOutUser: builder.mutation<IUser, { email: string; token: string }>({
      query: (body) => ({
        url: "/logout",
        method: "POST",
        body: body.email,
        headers: { Authorization: "Bearer " + body.token },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: true,
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
} = authApi
