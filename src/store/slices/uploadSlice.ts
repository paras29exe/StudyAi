import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UploadedFile } from '../../lib/types'

interface UploadState {
  files: UploadedFile[]
  url: string
  dragActive: boolean
  uploading: boolean
  uploadProgress: number
  error: string | null
}

const initialState: UploadState = {
  files: [],
  url: '',
  dragActive: false,
  uploading: false,
  uploadProgress: 0,
  error: null,
}

// Async thunk for file upload
export const uploadFiles = createAsyncThunk(
  'upload/uploadFiles',
  async (files: File[], { dispatch }) => {
    dispatch(setUploading(true))
    dispatch(setUploadProgress(0))

    // Convert files to UploadedFile format
    const uploadedFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
    }))

    dispatch(setFiles(uploadedFiles))

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      dispatch(setUploadProgress(progress))
      
      // Update individual file progress
      dispatch(updateFileProgress({ progress }))
    }

    // Mark files as completed
    dispatch(updateFileStatus({ status: 'completed' }))
    dispatch(setUploading(false))

    return uploadedFiles
  }
)

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<UploadedFile[]>) => {
      state.files = action.payload
    },
    addFiles: (state, action: PayloadAction<UploadedFile[]>) => {
      state.files.push(...action.payload)
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload)
    },
    updateFileStatus: (state, action: PayloadAction<{ 
      fileId?: string
      status: UploadedFile['status'] 
    }>) => {
      const { fileId, status } = action.payload
      if (fileId) {
        const file = state.files.find(f => f.id === fileId)
        if (file) {
          file.status = status
        }
      } else {
        // Update all files
        state.files.forEach(file => {
          file.status = status
        })
      }
    },
    
    updateFileProgress: (state, action: PayloadAction<{ 
      fileId?: string
      progress: number 
    }>) => {
      const { fileId, progress } = action.payload
      if (fileId) {
        const file = state.files.find(f => f.id === fileId)
        if (file) {
          file.progress = progress
        }
      } else {
        // Update all files
        state.files.forEach(file => {
          file.progress = progress
        })
      }
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload
    },
    setDragActive: (state, action: PayloadAction<boolean>) => {
      state.dragActive = action.payload
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload
    },
    clearUploadError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.error = null
      })
      .addCase(uploadFiles.fulfilled, (state) => {
        state.uploading = false
        state.uploadProgress = 100
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.uploading = false
        state.error = action.error.message || 'Upload failed'
        state.files.forEach(file => {
          if (file.status === 'uploading') {
            file.status = 'error'
          }
        })
      })
  },
})

export const {
  setFiles,
  addFiles,
  removeFile,
  updateFileStatus,
  updateFileProgress,
  setUrl,
  setDragActive,
  setUploading,
  setUploadProgress,
  clearUploadError,
} = uploadSlice.actions

export default uploadSlice.reducer