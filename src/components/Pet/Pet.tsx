import React, {useEffect} from 'react'
import { usePetStore } from '../../store/usePetStore'
import { DialogBubble } from '../UI/DialogBubble'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { ContextMenu } from '../UI/ContextMenu'

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
                {mode === 'talking' ? '💬' : mode === 'thinking' ? '⏳' : '🐺'}
            </div>
        </div>
    )
}