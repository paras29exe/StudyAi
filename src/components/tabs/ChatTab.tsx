'use client'

import { useAppSelector, useAppDispatch } from '@/store'
import { sendMessage } from '@/store/slices/chatSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Loader2, Bot, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function ChatTab() {
  const dispatch = useAppDispatch()
  const { messages, isTyping, loading } = useAppSelector(state => state.chat)
  const { user } = useAppSelector(state => state.app)
  const [inputValue, setInputValue] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || loading) return

    const messageContent = inputValue.trim()
    setInputValue('')
    
    try {
      await dispatch(sendMessage(messageContent)).unwrap()
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">StudyAI Assistant</h2>
            <p className="text-sm text-muted-foreground">
              {isTyping ? 'AI is typing...' : 'Ready to help with your studies'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4 max-w-4xl",
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                {message.sender === 'user' ? (
                  <>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div
                className={cn(
                  "flex-1 max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                )}
              >
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap break-words m-0">
                    {message.content}
                  </p>
                </div>
                <div className={cn(
                  "text-xs mt-2 opacity-70",
                  message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your documents..."
                className="pr-12 h-12 bg-background border-border resize-none"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-10 w-10"
                disabled={!inputValue.trim() || loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}