import React from 'react'

interface DialogBubbleProps {
    message: string;
}

export const DialogBubble: React.FC<DialogBubbleProps> = ({ message }) => {
    if (!message) return null;

    return (
    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-56 bg-white text-gray-800 p-3 rounded-xl shadow-lg border border-gray-200 text-sm select-none pointer-events-none">
      <p className="text-center break-words font-medium">{message}</p>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
    </div>
  )
}