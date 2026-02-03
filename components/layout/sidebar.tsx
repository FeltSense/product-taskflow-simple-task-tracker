'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Users, 
  Settings, 
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<any>
  active?: boolean
}

const navigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, active: true },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ className = '' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">TaskFlow</h1>
            <p className="text-sm text-gray-500 -mt-0.5">Simple Task Tracker</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    item.active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} className="mr-3 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@company.com</p>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 
          transform lg:transform-none transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${className}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  )
}