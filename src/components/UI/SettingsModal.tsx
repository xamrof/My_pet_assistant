import React, { useState} from 'react'
import {invoke} from '@tauri-apps/api/core'
import { usePetStore } from '../../store/usePetStore';


export const SettingsModal: React.FC = () => {
    const {isSettingsOpen, toggleSettings} = usePetStore()
    const [apiKey, setApiKey] = useState('')
    const [status, setStatus] = useState('')

    if (!isSettingsOpen) return null

    const handleSave = async () => {
        if (!apiKey.trim()) return

        try {
            await invoke('save_api_key', {key: apiKey})

            setStatus('¡Llave asegurada en la bóveda!');

            setApiKey('')

            setTimeout(() => {
                setStatus('')
                toggleSettings(false)
            }, 1500)
        } catch (error) {
            setStatus('Error al guardar la llave.')
        }
    }

return (
    <div className="absolute top-0 left-full ml-4 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50">
      <h3 className="text-gray-800 font-bold mb-2">⚙️ Configurar IA</h3>
      <p className="text-xs text-gray-500 mb-3">Tu API Key se guardará en la memoria nativa de Rust.</p>
      
      <input 
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="sk-..."
        className="w-full text-sm border border-gray-300 rounded px-2 py-1 mb-3 focus:outline-none focus:border-blue-500 text-gray-800"
      />
      
      <div className="flex justify-between items-center">
        <button onClick={() => toggleSettings(false)} className="text-xs text-gray-500 hover:text-gray-800">
          Cancelar
        </button>
        <button onClick={handleSave} className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded hover:bg-blue-700 transition-colors">
          Guardar
        </button>
      </div>
      
      {status && <p className="text-xs text-green-600 mt-2 text-center font-medium">{status}</p>}
    </div>
  );
}