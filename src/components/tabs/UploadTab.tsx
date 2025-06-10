'use client'

import { useAppSelector, useAppDispatch } from '@/store'
import { 
  uploadFiles, 
  setUrl, 
  setDragActive, 
  removeFile 
} from '@/store/slices/uploadSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Upload, 
  FileText, 
  Link2, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useCallback } from 'react'

export function UploadTab() {
  const dispatch = useAppDispatch()
  const { files, url, dragActive, uploading, uploadProgress } = useAppSelector(state => state.upload)
  const [urlInput, setUrlInput] = useState('')

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dispatch(setDragActive(true))
  }, [dispatch])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dispatch(setDragActive(false))
  }, [dispatch])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    dispatch(setDragActive(false))
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      dispatch(uploadFiles(droppedFiles))
    }
  }, [dispatch])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      dispatch(uploadFiles(selectedFiles))
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      dispatch(setUrl(urlInput))
      setUrlInput('')
      // Simulate URL processing
      console.log('Processing URL:', urlInput)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Documents</h1>
          <p className="text-muted-foreground mt-2">
            Upload your study materials or paste a URL to get started with AI-powered analysis.
          </p>
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Files
              </CardTitle>
              <CardDescription>
                Drag and drop your PDF files or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                  uploading && "pointer-events-none opacity-50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {dragActive ? 'Drop files here' : 'Upload your documents'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Support for PDF, DOC, DOCX files up to 10MB
                </p>
                <Button asChild disabled={uploading}>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    Choose Files
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* URL Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Import from URL
              </CardTitle>
              <CardDescription>
                Paste a link to an article, research paper, or webpage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://example.com/article"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="h-12"
                />
                <Button type="submit" className="w-full" disabled={!urlInput.trim()}>
                  Import from URL
                </Button>
              </form>
              {url && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Current URL:</p>
                  <p className="text-sm font-medium truncate">{url}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading files...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Uploaded Files */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>
                {files.length} file{files.length > 1 ? 's' : ''} ready for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(file.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {file.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'uploading' && (
                        <div className="w-16">
                          <Progress value={file.progress} className="h-1" />
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(removeFile(file.id))}
                        className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}