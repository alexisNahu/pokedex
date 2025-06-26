import z from "zod"

export const RegisterUserScheme = z.object({
    username: z.string().min(1, "The username is obligatory"),
    password: z.string().min(8, 'The password must have at least 8 characters'),
    confirmPassword: z.string().min(8),
    email: z.string().email('Invalid email'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be the same',
    path: ['confirmPassword']
})

export type RegisterUserType = z.infer<typeof RegisterUserScheme>