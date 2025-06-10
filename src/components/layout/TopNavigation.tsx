'use client'

import { useAppSelector, useAppDispatch } from '@/store'
import { setActiveTab } from '@/store/slices/uiSlice'
import { setTheme } from '@/store/slices/appSlice'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
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

export function TopNavigation() {
  const dispatch = useAppDispatch()
  const { activeTab } = useAppSelector(state => state.ui)
  const { user } = useAppSelector(state => state.app)
  const { theme, setTheme: setNextTheme } = useTheme()

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setNextTheme(newTheme)
    dispatch(setTheme(newTheme as 'light' | 'dark'))
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => dispatch(setActiveTab(value as any))}>
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

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleThemeToggle}>
              {theme === 'dark' ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}