'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TaskList {
  id: string
  name: string
  description?: string
  color: string
  taskCount: number
  createdAt: string
  updatedAt: string
}

interface TaskOrganization {
  id: string
  name: string
  lists: TaskList[]
  totalTasks: number
  createdAt: string
  updatedAt: string
}

export default function TaskOrganizationPage() {
  const [organizations, setOrganizations] = useState<TaskOrganization[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingOrg, setEditingOrg] = useState<TaskOrganization | null>(null)
  const [newOrgName, setNewOrgName] = useState('')

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/task-organization-with-listscategories')
      const data = await response.json()
      setOrganizations(data)
    } catch (error) {
      console.error('Failed to fetch organizations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!newOrgName.trim()) return
    
    try {
      const response = await fetch('/api/task-organization-with-listscategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newOrgName })
      })
      
      if (response.ok) {
        await fetchOrganizations()
        setShowCreateModal(false)
        setNewOrgName('')
      }
    } catch (error) {
      console.error('Failed to create organization:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this organization?')) return
    
    try {
      const response = await fetch(`/api/task-organization-with-listscategories?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchOrganizations()
      }
    } catch (error) {
      console.error('Failed to delete organization:', error)
    }
  }

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterBy === 'active') return matchesSearch && org.totalTasks > 0
    if (filterBy === 'empty') return matchesSearch && org.totalTasks === 0
    
    return matchesSearch
  })

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
    }
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Organization</h1>
              <p className="text-gray-600 mt-1">Organize your tasks with lists and categories</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Organization
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select 
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Organizations</option>
              <option value="active">With Tasks</option>
              <option value="empty">Empty</option>
            </select>
          </div>
        </div>

        {filteredOrganizations.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first task organization.</p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Create Organization
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <Card key={org.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{org.name}</h3>
                    <p className="text-sm text-gray-500">
                      {org.totalTasks} tasks • {org.lists.length} lists
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingOrg(org)}
                      className="p-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(org.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {org.lists.slice(0, 3).map((list) => (
                    <div key={list.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(list.color)}`}>
                          {list.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{list.taskCount} tasks</span>
                    </div>
                  ))}
                  {org.lists.length > 3 && (
                    <p className="text-xs text-gray-500">+{org.lists.length - 3} more lists</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                  <span>Created {new Date(org.createdAt).toLocaleDateString()}</span>
                  <Link 
                    href={`/dashboard/task-organization/${org.id}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <Input
                    type="text"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder="Enter organization name..."
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleCreate}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Create
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateModal(false)
                      setNewOrgName('')
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {editingOrg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl p-6 max-h-96 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Edit Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <Input
                    type="text"
                    value={editingOrg.name}
                    onChange={(e) => setEditingOrg({...editingOrg, name: e.target.value})}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lists ({editingOrg.lists.length})</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {editingOrg.lists.map((list) => (
                      <div key={list.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getColorClasses(list.color)}`}>
                          {list.name}
                        </span>
                        <span className="text-xs text-gray-500">{list.taskCount} tasks</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setEditingOrg(null)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditingOrg(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}