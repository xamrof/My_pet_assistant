import { sanitizeText } from "../utils/sanitizer";

export const fetchTechNews = async(): Promise<string> => {
    try {

        const response = await fetch('https://dev.to/api/articles?per_page=1&top=1');

        if (!response.ok) {
            throw new Error('Error al conectar con la api')
        }

        const data = await response.json()

        if (data && data.length > 0) {
            const safeTitle = sanitizeText(data[0].title)
            return `📰 Noticia del día: ${safeTitle}`;
        }

        return "No encontré noticias interesantes hoy"

    } catch (error) {
        console.error('Error fetching news', error)
        return "Ups parece que no tengo acceso a internet" 
    }
}