import React from 'react'
import { usePetStore } from '../../store/usePetStore'
import { getCurrentWindow } from '@tauri-apps/api/window'

export const ContextMenu: React.FC = () => {
    const {isMenuOpen, toggleMenu, fetchNews, showMessage} = usePetStore()

    if (!isMenuOpen) return null

    const handleAction = (action: () => void ) => {
        toggleMenu(false)
        action()
    }

    return (
    <div className="absolute top-0 left-full ml-4 w-40 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 text-sm text-gray-700">
      
      <button 
        onClick={() => handleAction(fetchNews)}
        className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        📰 Leer Noticias
      </button>

      <button 
        onClick={() => handleAction(() => showMessage("Buscando reto... (Próximamente)", 3000))}
        className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        💻 Reto Diario
      </button>

      <div className="h-px bg-gray-200 my-1"></div>

      {/* Actualizamos la función de este botón */}
      <button 
        onClick={() => getCurrentWindow().close()} 
        className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        ❌ Dormir (Cerrar)
      </button>

    </div>
  );
}