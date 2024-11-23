import { prisma } from '../config/database'
import axios from 'axios'
import type { DriverBody } from '../types/rideType'

// eslint-disable-next-line no-unused-vars
async function calculateRouteAndListDrivers(origin: string, destination: string, _customer_id: string): Promise<object> {
    if (origin === destination) {
        throw {
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos.',
        }
    }

    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
    const apiKey = process.env.GOOGLE_API_KEY

    const payload = {
        origin: { address: origin },
        destination: { address: destination },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE',
        computeAlternativeRoutes: false,
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false,
        },
        languageCode: 'pt-BR',
        units: 'UNITS_UNSPECIFIED',
    }

    const response = await axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'routes,',
        },
    })

    const route = response.data.routes[0]
    const leg = route.legs[0]

    const originLocation = leg.startLocation.latLng
    const destinationLocation = leg.endLocation.latLng
    const routeDistance = leg.distanceMeters / 1000

    const drivers = await prisma.driver.findMany({
        where: {
            minDistance: {
                lte: routeDistance,
            },
        },
        orderBy: {
            ratePerKm: 'asc',
        },
    })

    return {
        origin: {
            latitude: originLocation.latitude,
            longitude: originLocation.longitude,
        },
        destination: {
            latitude: destinationLocation.latitude,
            longitude: destinationLocation.longitude,
        },
        distance: leg.distanceMeters,
        duration: leg.duration,
        options: drivers.map(driver => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.car,
            review: {
                rating: driver.rating,
                comment: driver.comment,
            },
            value: driver.ratePerKm * (leg.distanceMeters / 1000),
        })),
        routeResponse: response.data,
    }
}

async function confirmTripAndSaveToHistory(
    origin: string,
    destination: string,
    customer_id: string,
    distance: number,
    duration: string,
    driver: DriverBody,
    value: number,
): Promise<void> {
    if (origin === destination) {
        throw {
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        }
    }

    const driverResult = await prisma.driver.findUnique({
        where: {
            id: driver.id,
        },
    })

    if (!driverResult) {
        throw {
            error_code: 'DRIVER_NOT_FOUND',
            error_description: 'Motorista não encontrado',
        }
    }

    const minDistanceDriver = driverResult.minDistance * 1000

    if (minDistanceDriver <= distance) {
        throw {
            error_code: 'INVALID_DISTANCE',
            error_description: 'Quilometragem inválida para o motorista',
        }
    }

    await prisma.ride.create({
        data: {
            customer_id,
            origin,
            destination,
            distance,
            duration,
            value,
            driver_id: driver.id,
        },
    })
}

async function listUserTrips(customer_id: string, driver_id: string): Promise<object> {
    if (driver_id) {
        const driverResult = await prisma.driver.findUnique({
            where: {
                id: Number(driver_id),
            },
        })

        if (!driverResult) {
            throw {
                error_code: 'INVALID_DRIVER',
                error_description: 'Motorista invalido',
            }
        }
    }

    const whereCondition = !driver_id ? { customer_id } : { customer_id, driver_id: Number(driver_id) }

    const rides = await prisma.ride.findMany({
        where: whereCondition,
        include: {
            driver: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    if (!rides.length) {
        throw {
            error_code: 'NO_RIDES_FOUND',
            error_description: 'Nenhum registro encontrado',
        }
    }

    return {
        customer_id,
        rides: rides.map(ride => ({
            id: ride.id,
            date: ride.createdAt,
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            driver: {
                id: ride.driver.id,
                name: ride.driver.name,
            },
            value: ride.value,
        })),
    }
}

export default {
    calculateRouteAndListDrivers,
    confirmTripAndSaveToHistory,
    listUserTrips,
}
