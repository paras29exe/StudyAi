'use client'

import { useAppSelector, useAppDispatch } from '@/store'
import { runTool, resetTool } from '@/store/slices/toolsSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  FileText, 
  HelpCircle, 
  CheckSquare, 
  CreditCard,
  Play,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Loader2,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function AIToolsTab() {
  const dispatch = useAppDispatch()
  const { tools, loading } = useAppSelector(state => state.tools)
  const { files } = useAppSelector(state => state.upload)
  const [expandedResults, setExpandedResults] = useState<string[]>([])

  const getToolIcon = (toolId: string) => {
    switch (toolId) {
      case 'summarize':
        return FileText
      case 'questions':
        return HelpCircle
      case 'mcqs':
        return CheckSquare
      case 'flashcards':
        return CreditCard
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'processing':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
      case 'completed':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/20'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    }
  }

  const handleRunTool = (toolId: string) => {
    dispatch(runTool(toolId))
  }

  const handleResetTool = (toolId: string) => {
    dispatch(resetTool(toolId))
    setExpandedResults(prev => prev.filter(id => id !== toolId))
  }

  const toggleResultExpansion = (toolId: string) => {
    setExpandedResults(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    )
  }

  const renderResults = (tool: any) => {
    if (!tool.results) return null

    switch (tool.id) {
      case 'summarize':
        return (
          <div className="prose prose-sm max-w-none">
            <p>{tool.results}</p>
          </div>
        )
      case 'questions':
        return (
          <div className="space-y-2">
            {tool.results.map((question: string, index: number) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium">{index + 1}. {question}</p>
              </div>
            ))}
          </div>
        )
      case 'mcqs':
        return (
          <div className="space-y-4">
            {tool.results.map((mcq: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <p className="font-medium">{index + 1}. {mcq.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {mcq.options.map((option: string, optIndex: number) => (
                    <div
                      key={optIndex}
                      className={cn(
                        "p-2 rounded border text-sm",
                        optIndex === mcq.correct
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-gray-50 border-gray-200"
                      )}
                    >
                      {String.fromCharCode(65 + optIndex)}. {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      case 'flashcards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.results.map((card: any, index: number) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-primary/5 border-b">
                  <p className="font-medium text-sm text-primary">Front</p>
                  <p className="mt-1">{card.front}</p>
                </div>
                <div className="p-4">
                  <p className="font-medium text-sm text-muted-foreground">Back</p>
                  <p className="mt-1">{card.back}</p>
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return <p>Results not available</p>
    }
  }

  const hasDocuments = files.length > 0

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Study Tools</h1>
          <p className="text-muted-foreground mt-2">
            Powerful AI tools to help you study more effectively with your uploaded documents.
          </p>
        </div>

        {/* No Documents Warning */}
        {!hasDocuments && (
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    No documents uploaded
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Upload documents first to use AI tools for analysis and study assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = getToolIcon(tool.id)
            const isExpanded = expandedResults.includes(tool.id)
            
            return (
              <Card key={tool.id} className="h-fit">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        {tool.badge && (
                          <Badge variant="secondary" className="mt-1">
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(tool.status)}>
                      {tool.status === 'processing' && (
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      )}
                      {tool.status === 'completed' && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{tool.description}</CardDescription>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {tool.status === 'available' && (
                      <Button
                        onClick={() => handleRunTool(tool.id)}
                        disabled={!hasDocuments || loading}
                        className="flex-1"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run Tool
                      </Button>
                    )}
                    
                    {tool.status === 'processing' && (
                      <Button disabled className="flex-1">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </Button>
                    )}
                    
                    {tool.status === 'completed' && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => toggleResultExpansion(tool.id)}
                          className="flex-1"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 mr-2" />
                          ) : (
                            <ChevronRight className="h-4 w-4 mr-2" />
                          )}
                          {isExpanded ? 'Hide' : 'Show'} Results
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleResetTool(tool.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Results Section */}
                  {tool.status === 'completed' && tool.results && (
                    <Collapsible open={isExpanded} onOpenChange={() => toggleResultExpansion(tool.id)}>
                      <CollapsibleContent className="space-y-4">
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3">Results:</h4>
                          <ScrollArea className="max-h-96">
                            {renderResults(tool)}
                          </ScrollArea>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Usage Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Tips for Better Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload clear, well-structured documents for best AI analysis</li>
              <li>• Use the summarize tool first to get an overview of your content</li>
              <li>• Generate questions and MCQs to test your understanding</li>
              <li>• Create flashcards for quick review sessions before exams</li>
              <li>• Combine multiple tools for comprehensive study preparation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}