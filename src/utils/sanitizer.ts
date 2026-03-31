export const sanitizeText = (text: string) : string => {
    if (!text) return ""
    return text.replace(/<\/?[^>]+(>|$)/g, "").trim();
}