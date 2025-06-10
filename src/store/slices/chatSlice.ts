import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ChatMessage, ChatHistory } from '../../lib/types'

interface ChatState {
  messages: ChatMessage[]
  chatHistory: ChatHistory[]
  currentChatId: string | null
  isTyping: boolean
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  messages: [
    {
      id: '1',
      content: "Hello! I'm your AI study assistant. I can help you understand your uploaded documents, answer questions, and create study materials. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ],
  chatHistory: [
    { id: '1', title: 'Linear Algebra Notes', timestamp: '2 hours ago', type: 'document' },
    { id: '2', title: 'Physics Chapter 5 Quiz', timestamp: '1 day ago', type: 'quiz' },
    { id: '3', title: 'Machine Learning Concepts', timestamp: '2 days ago', type: 'chat' },
    { id: '4', title: 'Calculus Problem Set', timestamp: '3 days ago', type: 'document' },
    { id: '5', title: 'Chemistry Equations', timestamp: '1 week ago', type: 'chat' },
  ],
  currentChatId: null,
  isTyping: false,
  loading: false,
  error: null,
}

// Async thunk for sending messages
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (content: string, { dispatch }) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    }

    dispatch(addMessage(userMessage))
    dispatch(setTyping(true))

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: "That's a great question! Based on your uploaded documents, I can help you understand this concept better. Let me break it down for you...",
      sender: 'ai',
      timestamp: new Date()
    }

    dispatch(addMessage(aiMessage))
    dispatch(setTyping(false))

    return aiMessage
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload
    },
    setChatHistory: (state, action: PayloadAction<ChatHistory[]>) => {
      state.chatHistory = action.payload
    },
    addToChatHistory: (state, action: PayloadAction<ChatHistory>) => {
      state.chatHistory.unshift(action.payload)
    },
    setCurrentChatId: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to send message'
        state.isTyping = false
      })
  },
})

export const {
  addMessage,
  clearMessages,
  setTyping,
  setChatHistory,
  addToChatHistory,
  setCurrentChatId,
} = chatSlice.actions

export default chatSlice.reducer