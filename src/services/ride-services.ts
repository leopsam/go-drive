import { prisma } from './../config/database';
import axios from 'axios';

async function calculateRouteAndListDrivers(origin: string, destination: string, customer_id: number | string): Promise<object> {
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    const apiKey = process.env.GOOGLE_API_KEY;

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
    };

    const response = await axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'routes,',
        },
    });

    const route = response.data.routes[0];
    const leg = route.legs[0];

    const originLocation = leg.startLocation.latLng;
    const destinationLocation = leg.endLocation.latLng;
    const routeDistance = leg.distanceMeters / 1000;

    const drivers = await prisma.driver.findMany({
        where: {
            minDistance: {
                lte: routeDistance,
            },
        },
        orderBy: {
            ratePerKm: 'asc',
        },
    });

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
    };
}

export default {
    calculateRouteAndListDrivers,
};
