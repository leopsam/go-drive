import { Router } from 'express'
import { handleConfirmTripAndSaveToHistory, handleCalculateRouteAndDrivers } from '../controllers/rideController'
import { validateSchema } from '../middleware/validateSchema'
import { estimateBodySchema } from '../schema/estimateBodySchema'
import { confirmBodySchema } from '../schema/confirmBodySchema'

const rideRoutes = Router()

rideRoutes
    .post('/estimate', validateSchema(estimateBodySchema), handleCalculateRouteAndDrivers)
    .patch('/confirm', validateSchema(confirmBodySchema), handleConfirmTripAndSaveToHistory)
    .get('/:id?/:driver_id', handleCalculateRouteAndDrivers)

export { rideRoutes }
