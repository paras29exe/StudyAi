import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UIState } from '../../lib/types'

const initialState: UIState = {
  sidebarCollapsed: false,
  activeTab: 'upload',
  loading: false,
  error: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    setActiveTab: (state, action: PayloadAction<'upload' | 'chat' | 'ai-tools'>) => {
      state.activeTab = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setActiveTab,
  setLoading,
  setError,
  clearError,
} = uiSlice.actions

export default uiSlice.reducer