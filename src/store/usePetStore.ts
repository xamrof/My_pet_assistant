import { create } from "zustand";
import { fetchTechNews } from "../services/api.devto";

export type PetMode = "idle" | "talking" | "sleeping" | "thinking";

interface PetState {
    mode: PetMode;
    message: string;
    isMenuOpen: boolean;
    setMode: (mode: PetMode) => void;
    showMessage: (text: string, duration?: number ) => void;
    clearMessage: () => void;
    fetchNews: () => Promise<void>
    toggleMenu: (isOpen: boolean) => void
}

export const usePetStore = create<PetState>((set, get) => ({
    mode: "idle",
    message: "",
    isMenuOpen: false,

    setMode: (mode) => set({ mode }),
    showMessage: (text, duration = 5000) => {
        set({message: text, mode: 'talking'})
        setTimeout(() => {
            if(get().message === text) {
                set({message: '', mode: 'idle'})
            }
        }, duration)
    },
    clearMessage: () => set({ message: "", mode: 'idle' }),

    fetchNews: async () => {
        set ({message: "Buscando en la red...", mode: 'thinking'})

        const newMessage = await fetchTechNews();

        get().showMessage(newMessage, 8000)
    },

    toggleMenu: (isOpen) => set({isMenuOpen: isOpen})
}));