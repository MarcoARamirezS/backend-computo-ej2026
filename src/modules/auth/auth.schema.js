import { z } from 'zod'

export const loginSchema = z.object({
  usuario: z
    .string({
      required_error: 'El usuario es obligatorio'
    })
    .min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})