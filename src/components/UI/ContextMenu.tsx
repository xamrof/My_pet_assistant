import React from 'react'
import { usePetStore } from '../../store/usePetStore'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { SettingsModal } from './SettingsModal'

export const ContextMenu: React.FC = () => {
    const {isMenuOpen, toggleMenu, fetchNews, fetchChallenge, toggleSettings, isSettingsOpen} = usePetStore()

    if(!isMenuOpen && !isSettingsOpen) return null

    const handleAction = (action: () => void ) => {
        toggleMenu(false)
        action()
    }

    return (
    <>
      {isMenuOpen && (
        <div className="absolute top-0 left-full ml-4 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-40 text-sm text-gray-700">
          <button onClick={() => handleAction(fetchNews)} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            📰 Leer Noticias
          </button>
          <button onClick={() => handleAction(fetchChallenge)} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
            💻 Reto Diario
          </button>
          
          <div className="h-px bg-gray-200 my-1"></div>
          
          <button onClick={() => toggleSettings(true)} className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            ⚙️ Configurar IA
          </button>
          <button onClick={() => getCurrentWindow().close()} className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors mt-1">
            ❌ Dormir (Cerrar)
          </button>
        </div>
      )}

      {/* El modal se renderiza condicionalmente basado en Zustand */}
      <SettingsModal />
    </>
  );
}