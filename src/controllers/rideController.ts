import type { Request, Response } from 'express'
import rideServices from '../services/rideServices'
import type { EstimateBody, Ride } from '../types/rideType'

export async function handleCalculateRouteAndDrivers(req: Request, res: Response): Promise<void> {
    try {
        const { origin, destination, customer_id } = req.body as EstimateBody

        const result = await rideServices.calculateRouteAndListDrivers(origin, destination, customer_id)

        res.status(200).json(result)
    } catch (err: any) {
        if (err.error_code === 'INVALID_DATA') {
            res.status(400).json(err)
        }

        res.status(500).send({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Ocorreu um erro inesperado.',
        })
    }
}

export async function handleConfirmTripAndSaveToHistory(req: Request, res: Response): Promise<void> {
    try {
        const { origin, destination, customer_id, distance, duration, driver, value } = req.body as Ride

        await rideServices.confirmTripAndSaveToHistory(origin, destination, customer_id, distance, duration, driver, value)

        res.status(200).json({ success: true })
    } catch (err: any) {
        if (err.error_code === 'INVALID_DATA') {
            res.status(400).json(err)
        }

        if (err.error_code === 'DRIVER_NOT_FOUND') {
            res.status(404).json(err)
        }

        if (err.error_code === 'INVALID_DISTANCE') {
            res.status(406).json(err)
        }

        res.status(500).send({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Ocorreu um erro inesperado.',
        })
    }
}
