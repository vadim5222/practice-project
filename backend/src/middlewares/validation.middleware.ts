import Send from '../utils/response.utils.js'
import { type NextFunction, type Request, type Response } from 'express'
import { ZodError, type ZodSchema } from 'zod'

class ValidationMiddleware {
    static validateBody (schema: ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try{
                schema.parse(req.body); 
                next()
            }catch(error){
                if (error instanceof ZodError) {
                    const formattedErrors : Record < string , string []> = {}

                    error.issues.forEach((err) => {
                        const field = err.path.join(".")
                        if (!formattedErrors[field]) {
                            formattedErrors[field] = []
                        }
                        formattedErrors[field].push(err.message)
                    })
                    return Send.validationErrors(res, formattedErrors)
                }
                return Send.error(res, 'Неверные данные запроса')
            }
        }
    }
}

export default ValidationMiddleware