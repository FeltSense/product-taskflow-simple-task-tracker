'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  assignee: string
  dueDate: string
  createdAt: string
}

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'todo' as 'todo' | 'in-progress' | 'completed',
    assignee: '',
    dueDate: ''
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/task-creation-and-management')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || task.status === statusFilter
    const matchesPriority = !priorityFilter || task.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleCreateTask = async () => {
    try {
      const response = await fetch('/api/task-creation-and-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })
      
      if (response.ok) {
        const createdTask = await response.json()
        setTasks([createdTask, ...tasks])
        setShowCreateModal(false)
        setNewTask({
          title: '',
          description: '',
          priority: 'medium',
          status: 'todo',
          assignee: '',
          dueDate: ''
        })
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleEditTask = async (task: Task) => {
    try {
      const response = await fetch(`/api/task-creation-and-management/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      
      if (response.ok) {
        const updatedTask = await response.json()
        setTasks(tasks.map(t => t.id === task.id ? updatedTask : t))
        setEditingTask(null)
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    try {
      const response = await fetch(`/api/task-creation-and-management/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id))
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'todo': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Creation & Management</h1>
              <p className="text-gray-600 mt-2">Organize and track your team's tasks efficiently</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
            >
              Create New Task
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search tasks or assignees..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-1">
            {filteredTasks.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-500 text-lg">No tasks found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start gap-2 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{task.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>Assignee: <span className="font-medium text-gray-700">{task.assignee}</span></span>
                          <span>Due: <span className="font-medium text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span></span>
                          <span>Created: <span className="font-medium text-gray-700">{new Date(task.createdAt).toLocaleDateString()}</span></span>
                        </div>
                      </div>
                      <div className="flex gap-2 lg:flex-col lg:w-auto">
                        <Button
                          onClick={() => setEditingTask(task)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(task.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      type="text"
                      value={newTask.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({...newTask, title: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={newTask.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTask({...newTask, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        value={newTask.priority}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select
                        value={newTask.status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTask({...newTask, status: e.target.value as 'todo' | 'in-progress' | 'completed'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Due Date</label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({...newTask, dueDate: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assignee</label>
                    <Input
                      type="text"
                      value={newTask.assignee}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask({...newTask, assignee: e.target.value})}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={handleCreateTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                  >
                    Create Task
                  </Button>
                  <Button
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      type="text"
                      value={editingTask.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTask({...editingTask, title: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={editingTask.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingTask({...editingTask, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        value={editingTask.priority}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditingTask({...editingTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select
                        value={editingTask.status}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditingTask({...editingTask, status: e.target.value as 'todo' | 'in-progress' | 'completed'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Due Date</label>
                      <Input
                        type="date"
                        value={editingTask.dueDate.split('T')[0]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTask({...editingTask, dueDate: e.target.value})}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assignee</label>
                    <Input
                      type="text"
                      value={editingTask.assignee}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTask({...editingTask, assignee: e.target.value})}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={() => handleEditTask(editingTask)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                  >
                    Update Task
                  </Button>
                  <Button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg"
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