import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import appReducer from './slices/appSlice'
import uiReducer from './slices/uiSlice'
import chatReducer from './slices/chatSlice'
import uploadReducer from './slices/uploadSlice'
import toolsReducer from './slices/toolsSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    ui: uiReducer,
    chat: chatReducer,
    upload: uploadReducer,
    tools: toolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['chat/addMessage'],
        ignoredPaths: ['chat.messages.timestamp'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector