import Joi from 'joi';
import { EstimateBody } from '../types/estimateBody-type';

export const estimateBodySchema = Joi.object<EstimateBody>({
    origin: Joi.string().trim().required(),
    destination: Joi.string().trim().required(),
    customer_id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
}).custom((value, helpers) => {
    if (value.origin === value.destination) {
        return helpers.error('any.invalid');
    }
    return value;
}, 'Validação personalizada');
