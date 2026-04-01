#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::State;

// 1. Nuestra "Bóveda" (Estado manejado por Tauri)
// Usamos Mutex para que sea seguro modificarlo entre diferentes hilos
struct AppState {
    api_key: Mutex<String>,
}

// 2. El comando seguro que React llamará
#[tauri::command]
fn save_api_key(key: String, state: State<'_, AppState>) -> Result<String, String> {
    // Bloqueamos la bóveda, guardamos la llave y la liberamos
    let mut api_key = state.api_key.lock().unwrap();
    *api_key = key;
    
    // Imprimimos en la consola de Rust (invisible para el usuario normal) para confirmar
    println!("🔐 Bóveda: Llave guardada de forma segura en memoria.");
    
    Ok("Llave asegurada".into())
}

fn main() {
    tauri::Builder::default()
        // 3. Inicializamos la bóveda vacía al abrir la app
        .manage(AppState {
            api_key: Mutex::new(String::new()),
        })
        // 4. Registramos el comando para que React pueda verlo
        .invoke_handler(tauri::generate_handler![save_api_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}