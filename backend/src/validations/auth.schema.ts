import { z } from 'zod'

const passwordSchema = z.string()
    .min(8, 'пароль должен содержать больше 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать как минимум одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать как минимум одну строчную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .regex(/[@$!%*?&]/, 'Пароль должен содержать как минимум один специальный символ')

const usernameSchema = z.string()
    .min(6, 'Имя пользователя должно состоять не менее чем из 6 символов')
    .max(20, 'Имя пользователя не должно превышать 20 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Имя пользователя может содержать только буквы, цифры, дефисы и подчеркивания')
    .refine((value) => !/^\d+$/.test(value), {
        message:'Имя пользователя не может содержать только цифры'
    })
    .refine((value) => !/[@$!%*?&]/.test(value), {
        message:'Имя пользователя не может содержать специальные символы'
    })

const login = z.object({
    email: z.string().trim().min(1, 'Email обязателен').email('Неккорентный формат email'),
    password: z.string().min(1,'Пароль обязателен')
})

const register = z.object({
    username: usernameSchema,
    email: z.string().email('Неккорентный формат email'),
    password: passwordSchema,
    password_confirmation: z.string().min(1, 'Подтверждение пароля обязательно')
}).refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Пароли не совпадают"
})


const authSchema = {
    login,
    register
}

export default authSchema