import { Router } from 'express';
import { handleCalculateRouteAndDrivers } from '../controllers/ride-controller';
import { validateSchema } from '../middleware/validateSchema';
import { estimateBodySchema } from '../schema/estimateBodySchema';

const rideRoutes = Router();

rideRoutes
    .post('/estimate', validateSchema(estimateBodySchema), handleCalculateRouteAndDrivers)
    .patch('/confirm', handleCalculateRouteAndDrivers)
    .get('/:id?/:driver_id', handleCalculateRouteAndDrivers);

export { rideRoutes };
