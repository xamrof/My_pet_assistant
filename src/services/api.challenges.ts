import { sanitizeText } from "../utils/sanitizer";

const CHALLENGES = [
  "💻 Reto: Escribe una función que invierta una cadena sin usar el método .reverse().",
  "💻 Reto: Crea un algoritmo para encontrar el número mayor en un arreglo no ordenado.",
  "💻 Reto: Implementa el clásico juego FizzBuzz del 1 al 100.",
  "💻 Reto: Escribe una función que valide si una palabra o frase es un palíndromo.",
  "💻 Reto: Crea un generador de la secuencia de Fibonacci hasta la posición N."
];

export const fetchDailyChallenge = async (): Promise<string> => {
    //SIMULATION

    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
    
        const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
        const selectedChallenge = CHALLENGES[randomIndex]
    
        return sanitizeText(selectedChallenge)
        
    } catch (error) {
        console.error('Error obteniendo el reto', error)
        return "Mi base de datos de retos está inaccesible ahora mismo. 🔧"
    }

}