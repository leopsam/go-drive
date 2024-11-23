import Joi from 'joi'
import type { Ride } from '../types/rideType'

export const confirmBodySchema = Joi.object<Ride>({
    customer_id: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    distance: Joi.number(),
    duration: Joi.string(),
    driver: Joi.object({
        id: Joi.number(),
        name: Joi.string(),
    }),
    value: Joi.number(),
})
