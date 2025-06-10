'use client'
import { useAppSelector } from '@/store'
import { Sidebar } from './Sidebar'
import { TopNavigation } from './TopNavigation'
import { UploadTab } from '../tabs/UploadTab'
import { ChatTab } from '../tabs/ChatTab'
import { AIToolsTab } from '../tabs/AIToolsTab'

export function MainLayout() {
  const { sidebarCollapsed, activeTab } = useAppSelector(state => state.ui)

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'upload':
        return <UploadTab />
      case 'chat':
        return <ChatTab />
      case 'ai-tools':
        return <AIToolsTab />
      default:
        return <UploadTab />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-80'
      }`}>
        <TopNavigation />
        <main className="flex-1 overflow-hidden">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  )
}