import { useEffect, useState } from "react";
import { PerfilService } from "../services/perfil.service";

type Estado = "cargando" | "logueado" | "no-logueado";

export function useAuthDestino() {
  const [estado, setEstado] = useState<Estado>("cargando");

  useEffect(() => {
    PerfilService.getMe()
      .then((res) => {
        setEstado(res.success ? "logueado" : "no-logueado");
      })
      .catch(() => setEstado("no-logueado"));
  }, []);

  const destino = estado === "logueado" ? "/portal/dashboard" : "/registrarme";

  return { estado, destino };
}