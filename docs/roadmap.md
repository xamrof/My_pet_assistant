# Roadmap: Asistente Virtual de Escritorio Seguro (Desktop Pet) 👾

## 1. Stack Tecnológico

- **Motor de Escritorio:** Tauri (Rust)
- **Frontend:** React.js
- **Estilos:** Tailwind CSS v3
- **Gestor de Estado:** Zustand 
- **APIs de Datos:** Dev.to / CodeWars
- **Seguridad 🔒:** Directivas OWASP (Aislamiento IPC, CSP estricto, sanitización).

---

## ETAPA 1: Lo Básico (Prueba de Concepto)

### Fase 1: Setup del Proyecto Base

- [✅] Ejecutar `npm create tauri-app@latest` (Seleccionar React + JS/TS).
- [✅] Ejecutar `npm install`.
- [✅] Ejecutar `npm run tauri dev` para validar la ventana.

### Fase 2: Configuración de Tailwind CSS v3

- [✅] Ejecutar `npm install -D tailwindcss@3 postcss autoprefixer`.
- [✅] Ejecutar `npx tailwindcss init -p`.
- [✅] Configurar las rutas (`./src/**/*.{js,jsx,ts,tsx}`) en `tailwind.config.js`.
- [✅] Añadir directivas de Tailwind en `src/index.css`.
- [✅] Renderizar un `<div className="bg-red-500 w-10 h-10">` para probar.

### Fase 3: Transparencia y Seguridad Base (Tauri Core)

- [✅] Modificar `tauri.conf.json`: `"decorations": false`, `"transparent": true`.
- [✅] 🔒 Configurar una **Content Security Policy (CSP)** estricta en `tauri.conf.json` para permitir solo conexiones a las APIs autorizadas (Dev.to, CodeWars).
- [✅] 🔒 Deshabilitar el acceso a APIs del sistema de Tauri que no usaremos (filesystem, shell) en el archivo de permisos para reducir la superficie de ataque.
- [✅] Configurar el CSS global (`body`, `#root`) con `background-color: transparent`.
- [✅] Añadir `data-tauri-drag-region` al div principal.
- [✅] Probar que la ventana es movible y transparente.

---

## ETAPA 2: El MVP (Producto Mínimo Viable)

### Fase 4: Interfaz del Personaje y Estado

- [✅] Instalar Zustand (`npm install zustand`).
- [✅] Crear `store/petStore.ts` con estados: `mode`, `message`.
- [✅] Crear componente `Pet.tsx` (imagen/GIF).
- [✅] Crear componente `DialogBubble.tsx` (burbuja Tailwind).
- [✅] 🔒 Asegurar que `DialogBubble.tsx` renderiza texto plano de React y NUNCA usar `dangerouslySetInnerHTML` para prevenir inyecciones XSS.

### Fase 5: Conexión con APIs (El Cerebro)

- [✅] 🔒 Crear `utils/sanitizer.ts` para prevenir ataques XSS.
- [✅] Crear `services/api.devto.ts` para traer noticias reales.
- [✅] Actualizar el Store (`usePetStore.ts`) para manejar peticiones asíncronas.
- [✅] Implementar un menú contextual (clic derecho) en el componente `Pet.tsx` para pedir noticias.

---

## ETAPA 3: El Asistente Inteligente (Integración LLM Segura) 🧠
*Objetivo: Dotar al asistente de IA generativa para retos de cualquier tema, protegiendo las credenciales mediante estándares OWASP.*

### Fase 7: La Bóveda de Credenciales (Tauri + Rust)

- [ ] Instalar el plugin oficial `tauri-plugin-store` (para guardar configuraciones) o integración con OS Keychain.
- [ ] Crear el componente `SettingsModal.tsx` en React para ingresar la API Key.
- [ ] Escribir el comando (Command) en Rust `save_api_key` para encriptar y guardar la llave fuera del alcance del frontend.

### Fase 8: El Proxy Interno de IA (Rust)

- [ ] Añadir dependencias en `Cargo.toml` (`reqwest` para peticiones HTTP y `serde_json`).
- [ ] Escribir el comando en Rust `generate_ai_challenge` que lea la llave segura, construya el prompt (ej. *"Genera un reto corto sobre [TEMA]"*) y haga la petición a la API del LLM.
- [ ] Sanitizar la respuesta de la IA dentro de Rust antes de enviarla al frontend.

### Fase 9: Expansión de la Interfaz (React)

- [ ] Añadir submenús en el `ContextMenu.tsx` (Ej: "Reto de Código", "Reto de Lógica", "Dato Curioso").
- [ ] Conectar el store de Zustand para que llame a los comandos de Rust (`invoke('generate_ai_challenge')`) en lugar del servicio estático.
- [ ] (Opcional) Implementar un pequeño input de texto en el globo de diálogo para hacerle preguntas directas al asistente.

---

## ETAPA 4: Pulido, Empaquetado y Distribución 📦

- [ ] Añadir un Sprite Sheet animado (CSS steps) en lugar de colores sólidos.
- [ ] Configurar el ícono oficial de la aplicación (`icon.ico`, `icon.icns`).
- [ ] Compilar el ejecutable final (`npm run tauri build`).