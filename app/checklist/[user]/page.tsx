'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checklistData } from '@/lib/checklist-data'

type CheckedItems = { [key: string]: boolean }

export default function ChecklistPage() {
  const params = useParams()
  const user = params.user as string
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCheckedItems()
  }, [user])

  const loadCheckedItems = async () => {
    try {
      const response = await fetch(`/api/checklist/${user}`)
      if (response.ok) {
        const data = await response.json()
        setCheckedItems(data.checkedItems || {})
      }
    } catch (error) {
      console.error('Error loading checklist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = async (itemName: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: checked
    }))

    try {
      await fetch(`/api/checklist/${user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, checked })
      })
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleReset = async () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toute la checklist ?')) {
      try {
        await fetch(`/api/checklist/${user}`, {
          method: 'DELETE'
        })
        setCheckedItems({})
      } catch (error) {
        console.error('Error resetting checklist:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Checklist Bivouac - {user}
            </h1>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {checklistData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                {category.name}
              </h2>

              {category.items && (
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <label
                      key={itemIndex}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems[item] || false}
                        onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              )}

              {category.subcategories && (
                <div className="space-y-4">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-700 mb-3">
                        {subcategory.name}
                      </h3>
                      <div className="space-y-2">
                        {subcategory.items.map((item, itemIndex) => (
                          <label
                            key={itemIndex}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems[item] || false}
                              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
