'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card.js'
import { Button } from '@/components/ui/button.js'
import { Input } from '@/components/ui/input.js'

// Simple icon components to replace heroicons
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)

const PencilIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
)

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
)

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
)

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>
)

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

interface TaskStatusItem {
  id: string
  taskName: string
  assignee: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  completedAt?: string
  progress: number
  tags: string[]
}

export default function TaskStatusPage() {
  const [tasks, setTasks] = useState<TaskStatusItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskStatusItem | null>(null)
  const [formData, setFormData] = useState({
    taskName: '',
    assignee: '',
    status: 'pending' as TaskStatusItem['status'],
    priority: 'medium' as TaskStatusItem['priority'],
    dueDate: '',
    progress: 0,
    tags: ''
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/task-status-and-completion')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async () => {
    try {
      const taskData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }
      
      const response = await fetch('/api/task-status-and-completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      
      if (response.ok) {
        await fetchTasks()
        resetForm()
        setShowCreateModal(false)
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleUpdateTask = async () => {
    if (!editingTask) return
    
    try {
      const taskData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }
      
      const response = await fetch(`/api/task-status-and-completion/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      
      if (response.ok) {
        await fetchTasks()
        resetForm()
        setEditingTask(null)
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/task-status-and-completion/${taskId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchTasks()
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      taskName: '',
      assignee: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      progress: 0,
      tags: ''
    })
  }

  const openEditModal = (task: TaskStatusItem) => {
    setEditingTask(task)
    setFormData({
      taskName: task.taskName,
      assignee: task.assignee,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      progress: task.progress,
      tags: task.tags.join(', ')
    })
  }

  const getStatusIcon = (status: TaskStatusItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />
      case 'overdue':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: TaskStatusItem['status']) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'in-progress':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getPriorityBadge = (priority: TaskStatusItem['priority']) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      default:
        return `${baseClasses} bg-green-100 text-green-800`
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Status & Completion</h1>
          <p className="text-gray-600">Monitor and manage your task progress and completion status</p>
        </div>

        <Card className="mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks or assignees..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
                
                <select
                  value={priorityFilter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </Card>

        {loading ? (
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tasks...</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredTasks.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-4">No tasks found</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Create Your First Task
                </Button>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(task.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{task.taskName}</h3>
                        <p className="text-gray-600 text-sm">Assigned to: {task.assignee}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className={getStatusBadge(task.status)}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className={getPriorityBadge(task.priority)}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        {task.completedAt && (
                          <p>Completed: {new Date(task.completedAt).toLocaleDateString()}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 min-w-24">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{task.progress}%</span>
                      </div>
                      
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(task)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {(showCreateModal || editingTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                  <Input
                    value={formData.taskName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, taskName: e.target.value })}
                    placeholder="Enter task name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                  <Input
                    value={formData.assignee}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, assignee: e.target.value })}
                    placeholder="Enter assignee name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, status: e.target.value as TaskStatusItem['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, priority: e.target.value as TaskStatusItem['priority'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Progress ({formData.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <Input
                    value={formData.tags}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={editingTask ? handleUpdateTask : handleCreateTask}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {editingTask ? 'Update' : 'Create'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingTask(null)
                    resetForm()
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}