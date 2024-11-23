import { Router } from 'express'
import { handleConfirmTripAndSaveToHistory, handleCalculateRouteAndDrivers, handleListUserTrips } from '../controllers/rideController'
import { validateSchema } from '../middleware/validateSchema'
import { estimateBodySchema } from '../schema/estimateBodySchema'
import { confirmBodySchema } from '../schema/confirmBodySchema'

const rideRoutes = Router()

rideRoutes
    .post('/estimate', validateSchema(estimateBodySchema), handleCalculateRouteAndDrivers)
    .patch('/confirm', validateSchema(confirmBodySchema), handleConfirmTripAndSaveToHistory)
    .get('/:customer_id/:driver_id?', handleListUserTrips)

export { rideRoutes }
