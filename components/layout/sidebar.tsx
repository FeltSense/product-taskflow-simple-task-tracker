'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';

const Sidebar = () => {
  const { user, signOut } = useAuth();

  const navItems = [
    {
      href: '/dashboard',
      icon: Home,
      label: 'Dashboard'
    },
    {
      href: '/dashboard/settings',
      icon: Settings,
      label: 'Settings'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-60 flex-col h-full">
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6b6ef2' }}>
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg leading-tight">TaskFlow</h1>
              <p className="text-xs text-gray-500 font-medium">Simple Task Tracker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="px-4 py-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#6b6ef2' }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email || 'Loading...'}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden w-16 flex flex-col h-full">
        {/* Logo Section */}
        <div className="px-4 py-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto" style={{ backgroundColor: '#6b6ef2' }}>
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="px-2 py-6 border-t border-gray-100">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: '#6b6ef2' }}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button
              onClick={signOut}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;