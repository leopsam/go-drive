export interface TripHistory {
  customer_id: string
  rides: {
    id: number
    date: string
    origin: string
    destination: string
    distance: number
    duration: string
    driver: {
      id: number
      name: string
    }
    value: number
  }[]
}

export interface RideEstimateData {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
  distance: number
  duration: string
  options: [
    {
      id: number
      name: string
      description: string
      vehicle: string
      review: {
        rating: number
        comment: string
      }
      value: number
    },
  ]
  routeResponse: {
    response: object
    mapStatic: string
  }
}

export interface RideEstimateBody {
  customerId: string
  origin: string
  destination: string
}

export type MapSectionProps = {
  mapStatic: string | undefined
}

export type DriverCardProps = {
  id: string
  name: string
  value: number
  description: string
  vehicle: string
  rating: number
  comment: string
  onSelect: (id: string, name: string, value: number) => void
}

export interface CardRideProps {
  origin: string
  destination: string
  date: string | Date
  driverName: string
  distance: number
  duration: string
  value: number
}
