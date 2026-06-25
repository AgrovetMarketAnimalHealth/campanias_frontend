import { useEffect, useState } from "react";
import { PerfilService } from "../services/perfil.service";

type Estado = "cargando" | "logueado" | "no-logueado";

// TODO: ajusta este tipo a lo que realmente devuelve PerfilService.getMe()
type Cliente = Record<string, unknown>;

interface AuthDestinoState {
  estado: Estado;
  cliente: Cliente | null;
}

// Estado compartido a nivel de módulo. Todos los componentes que llaman a
// useAuthDestino() leen de este mismo lugar, así que sin importar cuántos
// botones/secciones lo usen, PerfilService.getMe() se ejecuta UNA sola vez.
let cache: AuthDestinoState = { estado: "cargando", cliente: null };
let peticionEnVuelo: Promise<void> | null = null;
const listeners = new Set<(state: AuthDestinoState) => void>();

function avisarATodos() {
  listeners.forEach((listener) => listener(cache));
}

function obtenerPerfil() {
  if (!peticionEnVuelo) {
    peticionEnVuelo = PerfilService.getMe()
      .then((res: any) => {
        cache = {
          estado: res?.success ? "logueado" : "no-logueado",
          // Ajusta esto a la forma real de la respuesta de tu API
          cliente: res?.success ? res.data ?? res.cliente ?? null : null,
        };
      })
      .catch(() => {
        cache = { estado: "no-logueado", cliente: null };
      })
      .finally(() => {
        avisarATodos();
      });
  }
  return peticionEnVuelo;
}

export function useAuthDestino() {
  const [state, setState] = useState<AuthDestinoState>(cache);

  useEffect(() => {
    listeners.add(setState);

    if (cache.estado === "cargando") {
      obtenerPerfil();
    } else {
      // Ya había una respuesta resuelta antes de montar este componente
      setState(cache);
    }

    return () => {
      listeners.delete(setState);
    };
  }, []);

  const destino = state.estado === "logueado" ? "/portal/dashboard" : "/registrarme";

  return { estado: state.estado, destino, cliente: state.cliente };
}

// Útil si necesitas forzar una nueva consulta (ej. justo después de login/logout)
export function resetAuthDestinoCache() {
  cache = { estado: "cargando", cliente: null };
  peticionEnVuelo = null;
  avisarATodos();
}