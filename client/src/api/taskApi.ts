import { apiSlice } from "@/store/apiSlice"
import { setUser } from "@/store/loggedUserSlice"
import { ITodoItem } from "@/types/todo.types"
import { IUser } from "@/types/user.types"

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateTask: builder.mutation<
      { data: IUser; message: string },
      { userId: string; taskData: ITodoItem }
    >({
      query: (query) => ({
        url: `/users/${query.userId}/tasks/`,
        method: "POST",
        body: query.taskData,
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Task"],
    }),

    UpdateTask: builder.mutation<
      { data: IUser; message: string },
      { userId: string; taskId: string; taskData: ITodoItem }
    >({
      query: (query) => ({
        url: `/users/${query.userId}/tasks/${query.taskId}`,
        method: "PUT",
        body: query.taskData,
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Task"],
    }),

    ToggleTask: builder.mutation<
      { data: IUser; message: string },
      { userId: string; taskId: string }
    >({
      query: (query) => ({
        url: `/users/${query.userId}/tasks/${query.taskId}/toggle`,
        method: "PUT",
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
        } catch (error) {
          console.log(`Error on UpdateTask api mutation: ${error}`)
        }
      },
      invalidatesTags: ["Task"],
    }),

    DeleteTask: builder.mutation<
      { data: IUser; message: string },
      { userId: string; taskId: string }
    >({
      query: (query) => ({
        url: `/users/${query.userId}/tasks/${query.taskId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
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
  useToggleTaskMutation,
  useDeleteTaskMutation,
} = taskApi
