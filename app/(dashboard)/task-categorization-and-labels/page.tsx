'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Edit2, Trash2, Tag, Filter } from 'lucide-react'

interface Label {
  id: string
  name: string
  color: string
  category: string
  description?: string
  taskCount: number
  createdAt: string
}

export default function TaskCategorizationAndLabelsPage() {
  const [labels, setLabels] = useState<Label[]>([])
  const [filteredLabels, setFilteredLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingLabel, setEditingLabel] = useState<Label | null>(null)
  const [newLabel, setNewLabel] = useState({
    name: '',
    color: '#6366f1',
    category: '',
    description: ''
  })

  const categories = ['Personal', 'Work', 'Project', 'Priority', 'Status']
  const predefinedColors = [
    '#6366f1', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#64748b'
  ]

  useEffect(() => {
    fetchLabels()
  }, [])

  useEffect(() => {
    filterLabels()
  }, [labels, searchTerm, selectedCategory])

  const fetchLabels = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/task-categorization-and-labels')
      const data = await response.json()
      setLabels(data)
    } catch (error) {
      console.error('Error fetching labels:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterLabels = () => {
    let filtered = labels

    if (searchTerm) {
      filtered = filtered.filter(label =>
        label.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        label.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(label => label.category === selectedCategory)
    }

    setFilteredLabels(filtered)
  }

  const handleCreateLabel = async () => {
    try {
      const response = await fetch('/api/task-categorization-and-labels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLabel)
      })
      
      if (response.ok) {
        const createdLabel = await response.json()
        setLabels([...labels, createdLabel])
        setIsCreateModalOpen(false)
        setNewLabel({ name: '', color: '#6366f1', category: '', description: '' })
      }
    } catch (error) {
      console.error('Error creating label:', error)
    }
  }

  const handleEditLabel = async (label: Label) => {
    try {
      const response = await fetch(`/api/task-categorization-and-labels/${label.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLabel)
      })
      
      if (response.ok) {
        const updatedLabel = await response.json()
        setLabels(labels.map(l => l.id === label.id ? updatedLabel : l))
        setEditingLabel(null)
        setNewLabel({ name: '', color: '#6366f1', category: '', description: '' })
      }
    } catch (error) {
      console.error('Error updating label:', error)
    }
  }

  const handleDeleteLabel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this label?')) return

    try {
      const response = await fetch(`/api/task-categorization-and-labels/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setLabels(labels.filter(label => label.id !== id))
      }
    } catch (error) {
      console.error('Error deleting label:', error)
    }
  }

  const openEditModal = (label: Label) => {
    setEditingLabel(label)
    setNewLabel({
      name: label.name,
      color: label.color,
      category: label.category,
      description: label.description || ''
    })
  }

  const resetModal = () => {
    setIsCreateModalOpen(false)
    setEditingLabel(null)
    setNewLabel({ name: '', color: '#6366f1', category: '', description: '' })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Task Categorization & Labels</h1>
          <p className="text-gray-600 mt-1">Organize and categorize your tasks with custom labels</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Label
        </Button>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search labels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {filteredLabels.length === 0 ? (
          <Card className="p-8 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No labels found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first label to get started'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Label
              </Button>
            )}
          </Card>
        ) : (
          filteredLabels.map((label) => (
            <Card key={label.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: label.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900 truncate">{label.name}</h3>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {label.category}
                      </span>
                    </div>
                    {label.description && (
                      <p className="text-sm text-gray-600 mt-1 truncate">{label.description}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 mt-2 space-x-4">
                      <span>{label.taskCount} tasks</span>
                      <span>Created {new Date(label.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEditModal(label)}
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteLabel(label.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {(isCreateModalOpen || editingLabel) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingLabel ? 'Edit Label' : 'Create New Label'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label Name
                </label>
                <Input
                  value={newLabel.name}
                  onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                  placeholder="Enter label name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newLabel.category}
                  onChange={(e) => setNewLabel({ ...newLabel, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: newLabel.color }}
                  ></div>
                  <div className="grid grid-cols-5 gap-2">
                    {predefinedColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewLabel({ ...newLabel, color })}
                        className="w-6 h-6 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newLabel.description}
                  onChange={(e) => setNewLabel({ ...newLabel, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={resetModal}>
                Cancel
              </Button>
              <Button
                onClick={editingLabel ? () => handleEditLabel(editingLabel) : handleCreateLabel}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={!newLabel.name || !newLabel.category}
              >
                {editingLabel ? 'Update' : 'Create'} Label
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}