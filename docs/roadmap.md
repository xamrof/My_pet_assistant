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

### Fase 6: Pulido y Empaquetado

- [ ] Implementar la lógica en Rust (`main.rs`) para el *click-through*.
- [ ] Configurar el icono de la aplicación.
- [ ] 🔒 Revisar advertencias de seguridad del compilador de Rust.
- [ ] Ejecutar `npm run tauri build` para compilar el ejecutable.

---

## ETAPA 3: Proyecto Completo (Webapp y Sincronización)

### Fase 7: Arquitectura Webapp

- [ ] Refactorizar la lógica de Tauri (`window.__TAURI__`) para usar *feature flags*, evitando errores si se abre en navegador.
- [ ] Desplegar frontend en Vercel/Netlify configurando cabeceras de seguridad HTTP (HSTS, X-Frame-Options).

### Fase 8: Backend Seguro (Deno + Turso)

- [ ] Inicializar servidor Deno.
- [ ] Configurar Turso (SQLite).
- [ ] 🔒 Implementar validación estricta de entradas (Input Validation) en todos los endpoints de Deno.
- [ ] 🔒 Implementar CORS restrictivo en el servidor para que solo acepte peticiones de tu app local/webapp.

### Fase 9 y 10: Animaciones Avanzadas e IA

- [ ] Reemplazar GIFs por *Sprite Sheet* animado con CSS steps.
- [ ] 🔒 Si se integra una API de LLM (ej. Gemini), manejar la *API Key* exclusivamente desde el entorno de Rust o Deno, nunca desde React.