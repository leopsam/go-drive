import { Request, Response } from 'express';
import rideServices from '../services/ride-services';
import { EstimateBody } from '../types/estimateBody-type';

export async function handleCalculateRouteAndDrivers(req: Request, res: Response): Promise<void> {
    try {
        const { origin, destination, customer_id } = req.body as EstimateBody;

        const result = await rideServices.calculateRouteAndListDrivers(origin, destination, customer_id);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
}
