'use client'

import { useEffect, useState } from 'react'
import patchTripOptions from '@/services/patchTripOptionsApi'
import { RideEstimateBody, RideEstimateData } from '@/types'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import ButtonHistory from '@/components/ButtonHistory/index'
import DriverCard from '@/components/DriverCard'
import MapSection from '@/components/MapSection'
import TitleContainer from '@/components/TitleContainer/index'
import styles from './styles.module.css'

export default function Page() {
  const [data, setData] = useState<RideEstimateData | undefined>(undefined)
  const [body, setBody] = useState<RideEstimateBody | undefined>(undefined)
  const [driversData, setDriversData] = useState<object[] | undefined>(undefined)
  const [customerIdBody, setCustomerIdBody] = useState<string | null>(null)
  const [originBody, setOriginBody] = useState<string | null>(null)
  const [destinationBody, setDestinationBody] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedData = localStorage.getItem('rideEstimateData')
    const storedBody = localStorage.getItem('rideEstimateBody')
    if (storedData && storedBody) {
      setData(JSON.parse(storedData))
      setBody(JSON.parse(storedBody))
    }
  }, [])

  useEffect(() => {
    if (data && body) {
      setDriversData(data.options)
      setCustomerIdBody(body.customerId)
      setOriginBody(body.origin)
      setDestinationBody(body.destination)
    }
  }, [body, data])

  const handleSelectDriver = (id: string, name: string, value: number) => {
    const body = {
      customer_id: customerIdBody,
      origin: originBody,
      destination: destinationBody,
      distance: data?.distance,
      duration: data?.duration,
      driver: {
        id,
        name,
      },
      value,
    }

    patchTripOptions(body)
      .then((data) => {
        localStorage.removeItem('rideEstimateData')
        localStorage.removeItem('rideEstimateBody')
        router.push('/history')
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <TitleContainer>Rota 🌎</TitleContainer>
        <MapSection mapStatic={data?.routeResponse.mapStatic} />
        <ButtonHistory />
      </div>
      <div className={styles.containerDrivers}>
        <TitleContainer>Escolha um motorista</TitleContainer>
        {driversData &&
          driversData.map((drive: any) => (
            <DriverCard
              key={drive.id}
              id={drive.id}
              name={drive.name}
              value={drive.value}
              description={drive.description}
              vehicle={drive.vehicle}
              rating={drive.review.rating}
              comment={drive.review.comment}
              onSelect={handleSelectDriver}
            />
          ))}

        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
      </div>
    </div>
  )
}
