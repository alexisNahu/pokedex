import z from "zod"

export const RegisterUserScheme = z.object({
    username: z.string().min(1, "The username is obligatory"),
    password: z.string().min(3, 'The password must have at least 3 characters'),
    confirmPassword: z.string().min(8),
    email: z.string().email('Invalid email'),
    logUser: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be the same',
    path: ['confirmPassword']
})

export const LoginUserScheme = z.object({
    username: z.string().min(1, 'The username is obligatory'),
    password: z.string().min(3, 'The password must have at least 3 characters'),
})



export type LoginUserType = z.infer<typeof LoginUserScheme>

export type RegisterUserType = z.infer<typeof RegisterUserScheme>