"use client";

import { useAppSelector, useAppDispatch } from "@/store";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { setCurrentChatId } from "@/store/slices/chatSlice";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  FileText,
  BookOpen,
  Menu,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const { chatHistory, currentChatId } = useAppSelector((state) => state.chat);

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return MessageSquare;
      case "document":
        return FileText;
      case "quiz":
        return BookOpen;
      default:
        return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "chat":
        return "text-blue-500";
      case "document":
        return "text-green-500";
      case "quiz":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-80"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="font-semibold text-lg">StudyAI</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleSidebar())}
            className="hover:bg-accent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            className={cn(
              "w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
              sidebarCollapsed && "px-2 justify-center"
            )}
          >
            <Plus className="h-4 w-4" />
            {!sidebarCollapsed && "New Chat"}
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-hidden">
          {!sidebarCollapsed && (
            <div className="px-4 pb-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent Chats
              </h3>
            </div>
          )}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
              {chatHistory.map((chat) => {
                const Icon = getIcon(chat.type);
                const isActive = currentChatId === chat.id;

                return (
                  <Button
                    key={chat.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3 text-left transition-all hover:bg-accent group",
                      sidebarCollapsed && "px-2 justify-center",
                      isActive && "bg-accent border border-border"
                    )}
                    onClick={() => dispatch(setCurrentChatId(chat.id))}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 flex-shrink-0",
                        getTypeColor(chat.type)
                      )}
                    />
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {chat.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {chat.timestamp}
                        </div>
                      </div>
                    )}
                    {!sidebarCollapsed && (
                      <div
                        role="button"
                        tabIndex={0}
                        className="ml-auto h-6 w-6 flex items-center justify-center rounded hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </div>
                    )}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
