import { z } from "zod"

const baseSchema = z.object({
  tipo_persona: z.enum(["natural", "juridica"]),
  nombre: z.string().min(1, "El nombre es obligatorio").max(100),
  departamento: z.string().min(1, "El departamento es obligatorio"),
  email: z.string().email("Ingresa un correo válido"),
  telefono: z.string().min(1, "El teléfono es obligatorio").max(20),
  archivo_comprobante: z.instanceof(File, { message: "Debes subir un comprobante" }),
  acepta_politicas: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar las políticas de privacidad",
  }),
  acepta_terminos: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
})

const naturalSchema = baseSchema.extend({
  tipo_persona: z.literal("natural"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios").max(100),
  dni: z.string().regex(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos"),
  ruc: z.string().optional(),
})

const juridicaSchema = baseSchema.extend({
  tipo_persona: z.literal("juridica"),
  apellidos: z.string().optional(),
  dni: z.string().optional(),
  ruc: z.string().regex(/^\d{11}$/, "El RUC debe tener exactamente 11 dígitos"),
})

export const registerSchema = z.discriminatedUnion("tipo_persona", [
  naturalSchema,
  juridicaSchema,
])

export type TypeRegisterSchema = z.infer<typeof registerSchema>
export type TypeNaturalSchema = z.infer<typeof naturalSchema>
export type TypeJuridicaSchema = z.infer<typeof juridicaSchema>
