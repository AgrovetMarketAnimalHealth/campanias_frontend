import type { TypeRecoverPasswordSchema } from "../schemas/recovery-password.schema";
import type { TypeResetPasswordSchema } from "../schemas/reset-password.schema";
import type { TypeRegisterSchema } from "../schemas/register.schema";
import type { TypeLoginSchema } from "../schemas/login.schema";
import type {
  TypeAPIRecoverPassword,
  TypeAPIAuth,
  TypeAPIRegister,
  TypeAPIReenviarVerificacion,
} from "../types/auth.types";
import { getStoredUTMs } from "../hooks/useUTMTracker"; // 👈 único import nuevo

const API_URL = import.meta.env.VITE_API_URL;

export class AuthService {
  static async register(payload: TypeRegisterSchema): Promise<TypeAPIRegister> {
    const base = import.meta.env.BASE_URL;
    const [campanaSlug, tipoSlug] = base.split('/').filter(Boolean);

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // 👇 Adjunta UTMs si existen (si llegó por pauta, si no, no se envía nada)
    const utms = getStoredUTMs();
    Object.entries(utms).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const response = await fetch(
      `${API_URL}/api/auth/portal/register/${campanaSlug}/${tipoSlug}`,
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      }
    );

    const json = await response.json();
    return Object.assign(json, { status: response.status });
  }

  static async login(payload: TypeLoginSchema): Promise<TypeAPIAuth> {
    const response = await fetch(`${API_URL}/api/auth/portal/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    return Object.assign(json, { status: response.status });
  }

  static async recoverPassword(
    payload: TypeRecoverPasswordSchema,
  ): Promise<TypeAPIRecoverPassword> {
    const response = await fetch(
      `${API_URL}/api/auth/portal/recover-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    const json = await response.json();
    return Object.assign(json, { status: response.status });
  }

  static async resetPassword(
    payload: TypeResetPasswordSchema,
  ): Promise<TypeAPIRecoverPassword> {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    return Object.assign(json, { status: response.status });
  }

  static async verificarEmail(token: string): Promise<TypeAPIAuth> {
    const response = await fetch(
      `${API_URL}/api/auth/portal/verify-email/${token}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'include',
      },
    );
    const json = await response.json();
    return Object.assign(json, { status: response.status });
  }

  static async reenviarVerificacion(
    email: string,
  ): Promise<TypeAPIReenviarVerificacion> {
    const response = await fetch(
      `${API_URL}/api/auth/portal/reenviar-verificacion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      },
    );
    const json = await response.json();
    return Object.assign(json, { status: response.status });
  }
}