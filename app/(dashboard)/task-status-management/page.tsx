'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TaskStatus {
  id: string
  name: string
  color: string
  description: string
  isActive: boolean
  taskCount: number
  createdAt: string
  updatedAt: string
}

export default function TaskStatusManagementPage() {
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([])
  const [filteredStatuses, setFilteredStatuses] = useState<TaskStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingStatus, setEditingStatus] = useState<TaskStatus | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    color: '#6366f1',
    description: '',
    isActive: true
  })

  useEffect(() => {
    fetchTaskStatuses()
  }, [])

  useEffect(() => {
    filterAndSearchStatuses()
  }, [taskStatuses, searchQuery, filterActive])

  const fetchTaskStatuses = async () => {
    try {
      const response = await fetch('/api/task-status-management')
      if (response.ok) {
        const data = await response.json()
        setTaskStatuses(data)
      }
    } catch (error) {
      console.error('Failed to fetch task statuses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSearchStatuses = () => {
    let filtered = taskStatuses

    if (searchQuery) {
      filtered = filtered.filter(status => 
        status.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        status.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filterActive !== 'all') {
      filtered = filtered.filter(status => 
        filterActive === 'active' ? status.isActive : !status.isActive
      )
    }

    setFilteredStatuses(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingStatus 
        ? `/api/task-status-management/${editingStatus.id}`
        : '/api/task-status-management'
      
      const method = editingStatus ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchTaskStatuses()
        resetForm()
      }
    } catch (error) {
      console.error('Failed to save task status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task status?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/task-status-management/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchTaskStatuses()
      }
    } catch (error) {
      console.error('Failed to delete task status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (status: TaskStatus) => {
    setEditingStatus(status)
    setFormData({
      name: status.name,
      color: status.color,
      description: status.description,
      isActive: status.isActive
    })
    setShowCreateModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      color: '#6366f1',
      description: '',
      isActive: true
    })
    setEditingStatus(null)
    setShowCreateModal(false)
  }

  const getStatusBadge = (isActive: boolean) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isActive 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-800'
    }`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Status Management</h1>
              <p className="text-gray-600 mt-2">Manage your task statuses and workflow states</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              + Create Status
            </Button>
          </div>
        </div>

        <Card className="mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search task statuses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterActive === 'all' ? 'secondary' : 'outline'}
                onClick={() => setFilterActive('all')}
                className={filterActive === 'all' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                All
              </Button>
              <Button
                variant={filterActive === 'active' ? 'secondary' : 'outline'}
                onClick={() => setFilterActive('active')}
                className={filterActive === 'active' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                Active
              </Button>
              <Button
                variant={filterActive === 'inactive' ? 'secondary' : 'outline'}
                onClick={() => setFilterActive('inactive')}
                className={filterActive === 'inactive' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                Inactive
              </Button>
            </div>
          </div>
        </Card>

        {loading ? (
          <Card className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            <div className="hidden lg:block">
              <Card className="overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                    <div className="col-span-2">Status</div>
                    <div>Color</div>
                    <div>Tasks</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredStatuses.map((status) => (
                    <div key={status.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-2">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full flex-shrink-0"
                              style={{ backgroundColor: status.color }}
                            ></div>
                            <div>
                              <div className="font-medium text-gray-900">{status.name}</div>
                              <div className="text-sm text-gray-500">{status.description}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-mono text-gray-600">{status.color}</div>
                        <div className="text-sm text-gray-900">{status.taskCount} tasks</div>
                        <div>{getStatusBadge(status.isActive)}</div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(status)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(status.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:hidden grid gap-4">
              {filteredStatuses.map((status) => (
                <Card key={status.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <div>
                        <h3 className="font-medium text-gray-900">{status.name}</h3>
                        <p className="text-sm text-gray-500">{status.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(status.isActive)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Color: {status.color}</span>
                    <span>{status.taskCount} tasks</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEdit(status)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => handleDelete(status.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredStatuses.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No task statuses found</h3>
                  <p className="text-gray-600 mb-6">Get started by creating your first task status.</p>
                  <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Create Status
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingStatus ? 'Edit Status' : 'Create Status'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status Name
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. In Progress, Completed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="h-10 w-20 rounded border border-gray-300"
                      />
                      <Input
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="#6366f1"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      placeholder="Brief description of this status"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active Status
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      {loading ? 'Saving...' : (editingStatus ? 'Update' : 'Create')}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}