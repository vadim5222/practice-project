import Send from  "@utils/response.utils" ; 
import {prisma} from 'db'
import {Request, Response} from 'express'
import authSchema from 'validators/auth.schema'
import bcrypt from "bcryptjs";
import { z } from 'zod'
import jwt  from "jsonwebtoken";
import authConfig from "@config/auth.config.js";


class AuthController {
    static login = async (req: Request, res: Response) => {
        const {email, password} = req.body as z.infer<typeof authSchema.login>

        try{
            const user = await prisma.user.findUnique({
                where: { email }
            })
            if (!user){
                return Send.error(res, null, 'Invalid credentials')
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid){
                return Send.error(res, null, 'Invalid credentials')
            }

            const accessToken = jwt.sign(
                {userId: user.id},
                authConfig.secret,
                {expiresIn: authConfig.secret_expires_in as any}
            )

            const refreshToken = jwt.sign(
                {userId : user.id},
                authConfig.refresh_secret,
                {expiresIn : authConfig.refresh_secret_expires_in as any}
            )

            await prisma.user.update({
                where: {email},
                data : { refreshToken }
            })

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 16 * 60 * 1000,
                sameSite: 'strict'
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            })

            return Send.success(res, {
                id: user.id,
                username: user.username,
                email: user.email
            })            
        }catch(error){
            console.error('Login failed:', error)
            return Send.error(res, null, 'Login failed')
        }
    }


    static register = async (req: Request, res: Response) => {
        const {username, email, password, password_confirmation} = req.body as z.infer<typeof authSchema.register>

        try{
            const existingUser = await prisma.user.findUnique({
                where: { email }
            })

            if (existingUser){
                return Send.error(res, null, 'Email is already in use')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            })
            return Send.success(res, {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }, 'User successfully registered')
        }catch (error){
            console.error('Registration failed:', error)
            return Send.error(res, null, 'Registration failed')
        }
    }

    static logout = async (req: Request, res: Response) => {
        try{
            const userId = (req as any).user?.userId
            if (userId){
                await prisma.user.update({
                    where: {id:userId},
                    data: {refreshToken: null}
                })
            }

            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')

            return Send.success(res, null, 'Logged out successfully')
        }catch (error){
            console.error('Logout failed:', error)
            return Send.error(res, null, 'Logout failed')
        }
    }

    static refreshToken = async (req: Request, res: Response) => {
        try{
            const userId = (req as any).user?.userId
            const refreshToken = req.cookies.refreshToken
            const user = await prisma.user.findUnique({
                where : {id: userId}
            })

            if (!user || !user.refreshToken){
                return Send.unauthorized(res, 'Refresh token not found')
            }

            if (user.refreshToken !== refreshToken){
                return Send.unauthorized(res, {message: 'Invalid refresh token'})
            }

            const newAccessToken = jwt.sign(
                {userId : user.id},
                authConfig.secret,
                {expiresIn: authConfig.secret_expires_in as any}
            )

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: 'strict'
            })

            return Send.success(res, {message: 'Access token refreshed successfully'})

        }catch (error){
            console.error('Refresh token failed:', error)
            return Send.error(res, null, 'Failed to refresh token')
        }
    }
}

export default AuthController