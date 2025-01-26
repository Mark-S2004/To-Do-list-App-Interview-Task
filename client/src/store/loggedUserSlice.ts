import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IUser } from "@/types/user.types"
import { RootState } from "@/store"

interface ILoggedUserState {
  data: IUser | null
}
const initialState: ILoggedUserState = {
  data: null,
}

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload
    },
    logout: (state) => {
      state.data = null
    },
  },
})

export const { setUser, logout } = loggedUserSlice.actions
export const selectUserName = (state: RootState) => state.loggedUser.data?.name
export default loggedUserSlice.reducer
