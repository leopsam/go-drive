/* eslint-disable */
import rideServices from '../../services/rideServices'
import { prisma } from '../../config/database'
import type { Request, Response, NextFunction } from 'express'
import { validateSchema } from 'middleware/validateSchema'
import { estimateBodySchema } from 'schema/estimateBodySchema'

jest.mock('axios')
jest.mock('../../config/database')
jest.mock('@prisma/client')
jest.mock('../../config/database', () => ({
    prisma: {
        driver: {
            findUnique: jest.fn(),
        },
        ride: {
            findMany: jest.fn(),
        },
    },
}))

describe('Calculate Route And List Drivers', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let next: NextFunction

    beforeEach(() => {
        req = {
            body: { origin: 'Rua A', destination: 'Rua B', customer_id: '123' }, // Dados válidos
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        next = jest.fn()
    })

    it('Should throw error when source and destination addresses are same', async () => {
        const origin = 'Rua Aratiba, Nova Iguaçu, RJ'
        const destination = 'Rua Aratiba, Nova Iguaçu, RJ'

        await expect(rideServices.calculateRouteAndListDrivers(origin, destination, '123')).rejects.toMatchObject({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
    })

    it('should return error when origin is blank', () => {
        req.body = { origin: '', destination: 'Rua Aratiba, Nova Iguaçu, RJ', customer_id: '123' } // Dados inválidos
        validateSchema(estimateBodySchema)(req as Request, res as Response, next)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
        expect(next).not.toHaveBeenCalled()
    })

    it('should return error when destination is blank', () => {
        req.body = { origin: 'Rua Aratiba, Nova Iguaçu, RJ', destination: '', customer_id: '123' } // Dados inválidos
        validateSchema(estimateBodySchema)(req as Request, res as Response, next)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
        expect(next).not.toHaveBeenCalled()
    })

    it('should return error when customer_id is blank', () => {
        req.body = { origin: 'Rua Aratiba, Nova Iguaçu, RJ', destination: 'Rua Colorado, Nova Iguaçu, RJ', customer_id: '' } // Dados inválidos
        validateSchema(estimateBodySchema)(req as Request, res as Response, next)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
        expect(next).not.toHaveBeenCalled()
    })
})

describe('Confirm Trip And Save To History', () => {
    it('Should throw error when userid is blank', async () => {
        const origin = 'Rua Aratiba, Nova Iguaçu, RJ'
        const destination = 'Rua Aratiba, Nova Iguaçu, RJ'
        const customer_id = ''
        const distance = 7319
        const duration = '4274s'
        const value = 173.42
        const driver = {
            id: 1,
            name: 'Homer Simpson',
        }

        await expect(rideServices.confirmTripAndSaveToHistory(origin, destination, customer_id, distance, duration, driver, value)).rejects.toMatchObject({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
    })
    it('Should throw error when source and destination addresses are same', async () => {
        const origin = 'Rua Aratiba, Nova Iguaçu, RJ'
        const destination = 'Rua Aratiba, Nova Iguaçu, RJ'
        const customer_id = '98798798798798'
        const distance = 7319
        const duration = '4274s'
        const value = 173.42
        const driver = {
            id: 1,
            name: 'Homer Simpson',
        }

        await expect(rideServices.confirmTripAndSaveToHistory(origin, destination, customer_id, distance, duration, driver, value)).rejects.toMatchObject({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
    })

    it('should return null when driver is not found', async () => {
        const origin = 'Rua Aratiba, Nova Iguaçu, RJ'
        const destination = 'Rua Colorado, Nova Iguaçu, RJ'
        const customer_id = '98798798798798'
        const distance = 7319
        const duration = '4274s'
        const value = 173.42
        const driver = {
            id: 5,
            name: 'Bob Esponja',
        }

        ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue(null)

        await expect(rideServices.confirmTripAndSaveToHistory(origin, destination, customer_id, distance, duration, driver, value)).rejects.toMatchObject({
            error_code: 'DRIVER_NOT_FOUND',
            error_description: 'Motorista não encontrado',
        })
    })

    it('Should throw error when mileage is invalid for driver', async () => {
        const origin = 'Rua Aratiba, Nova Iguaçu, RJ'
        const destination = 'Rua Colorado, Nova Iguaçu, RJ'
        const customer_id = '98798798798798'
        const distance = 7319
        const duration = '4274s'
        const value = 173.42
        const driver = {
            id: 3,
            name: 'James Bond',
        }

        ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue({ id: 3, name: 'James Bond', minDistance: 10 })

        await expect(rideServices.confirmTripAndSaveToHistory(origin, destination, customer_id, distance, duration, driver, value)).rejects.toMatchObject({
            error_code: 'INVALID_DISTANCE',
            error_description: 'Quilometragem inválida para o motorista',
        })
    })
})

describe('List User Trips', () => {
    it('Should throw error when driver id is invalid', async () => {
        const customer_id = '1'
        const driver_id = '5'

        ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue(null)

        await expect(rideServices.listUserTrips(customer_id, driver_id)).rejects.toMatchObject({
            error_code: 'INVALID_DRIVER',
            error_description: 'Motorista invalido',
        })
    })

    it('Should throw error when userid is blank', async () => {
        const customer_id = ''
        const driver_id = ''

        ;(prisma.ride.findMany as jest.Mock).mockResolvedValue([])

        await expect(rideServices.listUserTrips(customer_id, driver_id)).rejects.toMatchObject({
            error_code: 'NO_RIDES_FOUND',
            error_description: 'Nenhum registro encontrado',
        })
    })
})
