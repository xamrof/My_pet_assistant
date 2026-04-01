import React, {useEffect} from 'react'
import { usePetStore } from '../../store/usePetStore'
import { DialogBubble } from '../UI/DialogBubble'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { ContextMenu } from '../UI/ContextMenu'

import petAvatar from '../../assets/fenrir.png'

export const Pet: React.FC = () => {
    const {mode, message, showMessage, fetchNews, isMenuOpen, toggleMenu} = usePetStore()

    const getPetColor = () => {
        switch (mode) {
            case 'talking' : return 'bg-blue-500'
            case 'sleeping' : return 'bg-indigo-800'
            case 'thinking' : return 'bg-amber-500'
            case 'idle' :
            default: return 'bg-red-500'
        }
    }

    //TEMPORAL

    useEffect(() => {
            showMessage('¡Hola! Hazme click para ver las noticias', 4000)
    }, [showMessage])

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0){
            if(isMenuOpen) {
                toggleMenu(false)
            }else{
                getCurrentWindow().startDragging()
            }
        }else if (e.button === 2){
            e.preventDefault()
            fetchNews()
        }
    }
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        toggleMenu(!isMenuOpen);
    }

    return (
        <div className='relative flex flex-col items-center justify-center'>
            <DialogBubble message={message}/>

            <ContextMenu/>
            <div 
                onMouseDown={handleMouseDown}
                onContextMenu={handleContextMenu} 
                className={`${getPetColor()} w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold select-none transition-colors duration-500 transform hover:scale-110 cursor-pointer`}
            >
                {mode === 'thinking' && <span className="absolute -top-4 -right-4 text-2xl animate-bounce">⏳</span>}
                {mode === 'talking' && <span className="absolute -top-4 -right-4 text-2xl animate-pulse">💬</span>}
                <img 
                    src={petAvatar}
                    alt="My Assistant" 
                    className='w-32 h-32 object-contain drop-shadow-2xl'
                    draggable={false}
                />

            </div>
        </div>
    )
}