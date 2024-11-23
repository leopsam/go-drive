import type { Request, Response, NextFunction } from 'express'
import type Joi from 'joi'

export function validateSchema(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
            })

            return
        }

        next()
    }
}
