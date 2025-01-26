import { apiSlice } from "@/store/apiSlice"
import { setUser } from "@/store/loggedUserSlice"
import { ITodoItem } from "@/types/todo.types"
import { IUser } from "@/types/user.types"

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateTask: builder.mutation<IUser, ITodoItem>({
      query: (taskData) => ({
        url: `/users/:userId/tasks/`,
        method: "POST",
        body: taskData,
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Task"],
    }),

    UpdateTask: builder.mutation<IUser, ITodoItem>({
      query: (taskData) => ({
        url: `/users/:userId/tasks/:taskId`,
        method: "PUT",
        body: taskData,
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Task"],
    }),

    DeleteTask: builder.mutation<IUser, void>({
      query: () => ({
        url: `/users/:userId/tasks/:taskId`,
        method: "DELETE",
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Task"],
    }),
  }),
  overrideExisting: true,
})

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi
