import { apiSlice } from "@/store/apiSlice"
import { setUser } from "@/store/loggedUserSlice"
import { IUser } from "@/types/user.types"

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ data: IUser; message: string }, string>({
      query: (id) => `/users/${id}`,
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      //   invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
})

export const { useGetUserQuery } = userApi
