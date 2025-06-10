export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export interface ChatHistory {
  id: string
  title: string
  timestamp: string
  type: 'chat' | 'document' | 'quiz'
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
}

export interface AITool {
  id: string
  title: string
  description: string
  status: 'available' | 'processing' | 'completed'
  badge?: string
  results?: any
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AppState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark' | 'system'
}

export interface UIState {
  sidebarCollapsed: boolean
  activeTab: 'upload' | 'chat' | 'ai-tools'
  loading: boolean
  error: string | null
}