'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleUserSelect = (userName: string) => {
    router.push(`/checklist/${userName}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Checklist Bivouac
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sélectionnez votre utilisateur :
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleUserSelect('Nicolas')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Nicolas
          </button>
          <button
            onClick={() => handleUserSelect('Florent')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Florent
          </button>
          <button
            onClick={() => handleUserSelect('Autre')}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Autre
          </button>
        </div>
      </div>
    </div>
  )
}
