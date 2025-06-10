import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AITool } from '../../lib/types'

interface ToolsState {
  tools: AITool[]
  loading: boolean
  error: string | null
}

const initialState: ToolsState = {
  tools: [
    {
      id: 'summarize',
      title: 'Summarize Document',
      description: 'Generate concise summaries of your uploaded documents with key points and main concepts.',
      status: 'available',
      badge: 'Quick'
    },
    {
      id: 'questions',
      title: 'Generate Questions',
      description: 'Create study questions based on your documents to test your understanding.',
      status: 'available',
      badge: 'Study Aid'
    },
    {
      id: 'mcqs',
      title: 'Create MCQs',
      description: 'Interactive multiple-choice questions with detailed explanations for each answer.',
      status: 'available',
      badge: 'Interactive'
    },
    {
      id: 'flashcards',
      title: 'Generate Flashcards',
      description: 'Create digital flashcards from your study materials for quick review sessions.',
      status: 'available',
      badge: 'Review'
    }
  ],
  loading: false,
  error: null,
}

// Async thunk for running AI tools
export const runTool = createAsyncThunk(
  'tools/runTool',
  async (toolId: string, { dispatch, getState }) => {
    dispatch(updateToolStatus({ toolId, status: 'processing' }))

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock results based on tool type
    const mockResults = {
      summarize: 'Generated summary of the document...',
      questions: ['Question 1?', 'Question 2?', 'Question 3?'],
      mcqs: [
        { question: 'MCQ 1?', options: ['A', 'B', 'C', 'D'], correct: 0 },
        { question: 'MCQ 2?', options: ['A', 'B', 'C', 'D'], correct: 1 }
      ],
      flashcards: [
        { front: 'Term 1', back: 'Definition 1' },
        { front: 'Term 2', back: 'Definition 2' }
      ]
    }

    dispatch(updateToolResults({ 
      toolId, 
      results: mockResults[toolId as keyof typeof mockResults] 
    }))
    
    dispatch(updateToolStatus({ toolId, status: 'completed' }))

    return { toolId, results: mockResults[toolId as keyof typeof mockResults] }
  }
)

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    updateToolStatus: (state, action: PayloadAction<{
      toolId: string
      status: AITool['status']
    }>) => {
      const { toolId, status } = action.payload
      const tool = state.tools.find(t => t.id === toolId)
      if (tool) {
        tool.status = status
      }
    },
    updateToolResults: (state, action: PayloadAction<{
      toolId: string
      results: any
    }>) => {
      const { toolId, results } = action.payload
      const tool = state.tools.find(t => t.id === toolId)
      if (tool) {
        tool.results = results
      }
    },
    resetTool: (state, action: PayloadAction<string>) => {
      const tool = state.tools.find(t => t.id === action.payload)
      if (tool) {
        tool.status = 'available'
        tool.results = undefined
      }
    },
    resetAllTools: (state) => {
      state.tools.forEach(tool => {
        tool.status = 'available'
        tool.results = undefined
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runTool.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(runTool.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(runTool.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Tool execution failed'
      })
  },
})

export const {
  updateToolStatus,
  updateToolResults,
  resetTool,
  resetAllTools,
} = toolsSlice.actions

export default toolsSlice.reducer