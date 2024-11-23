import Joi from 'joi'
import type { EstimateBody } from '../types/rideType'

export const estimateBodySchema = Joi.object<EstimateBody>({
    origin: Joi.string().trim().required(),
    destination: Joi.string().trim().required(),
    customer_id: Joi.string().required(),
})
