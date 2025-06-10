'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { setActiveTab } from '@/store/slices/uiSlice'
import { setTheme as setAppTheme } from '@/store/slices/appSlice'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Upload,
  MessageSquare,
  Wrench,
  Settings,
  Moon,
  Sun,
  LogOut,
  User
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function TopNavigation() {
  const dispatch = useAppDispatch()
  const { activeTab } = useAppSelector((state) => state.ui)
  const { user } = useAppSelector((state) => state.app)
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    dispatch(setAppTheme(newTheme as 'light' | 'dark'))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={(value: any) => dispatch(setActiveTab(value))}>
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              AI Tools
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Custom Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>

          {open && (
            <div
              className={cn(
                'absolute right-0 mt-2 w-56 rounded-md border border-border bg-popover p-2 shadow-xl z-50',
                'animate-in fade-in zoom-in-95'
              )}
            >
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <hr className="my-2 border-border" />
              <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted">
                <User className="h-4 w-4" /> Profile
              </button>
              <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <button
                onClick={toggleTheme}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <hr className="my-2 border-border" />
              <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
