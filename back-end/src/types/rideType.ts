export type Ride = {
    origin: string
    destination: string
    customer_id: string
    distance: number
    duration: string
    driver: DriverBody
    value: number
}

export type EstimateBody = Omit<Ride, 'distance' | 'duration' | 'driver' | 'value'>

export type DriverBody = {
    id: number
    name: string
}
