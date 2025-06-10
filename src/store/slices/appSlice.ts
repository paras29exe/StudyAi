import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, User } from '../../lib/types'

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  theme: 'system',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
  },
})

export const { setUser, clearUser, setTheme } = appSlice.actions
export default appSlice.reducer