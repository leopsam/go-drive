'use client'

import React from 'react'
import { useState } from 'react'
import getTripHistory from '@/services/getTripHistoryApi'
import { TripHistory } from '@/types'
import { toast } from 'react-toastify'
import CardRide from '../CardRide'
import styles from './styles.module.css'

function RideFilterForm() {
  const [data, setData] = useState<TripHistory | null>(null)
  const [customerId, setCustomerId] = useState<string>('')
  const [driverId, setDriverId] = useState<string>('')

  const handleSelectRide = (e: any) => {
    e.preventDefault()
    setData(null)

    getTripHistory(customerId, driverId)
      .then((data: TripHistory) => {
        setData(data)
        console.log(data)
        if (!data && !customerId) toast.info('Nenhum registro encontrado!')
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  return (
    <>
      <form className={styles.formStyle} onSubmit={handleSelectRide}>
        <div className={styles.inputItem}>
          <label htmlFor="customerId">Usuário:</label>
          <input id="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Informe o ID do usuário" />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="seletor">Motorista:</label>
          <select id="seletor" name="seletor" value={driverId} onChange={(e) => setDriverId(e.target.value)}>
            <option value="">Mostrar todos os motoristas</option>
            <option value="1">Homer Simpson</option>
            <option value="2">Dominic Toretto</option>
            <option value="3">James Bond</option>
          </select>
        </div>
        <div className={styles.inputItem}>
          <button className={styles.buttonSubmit} type="submit">
            FILTRAR
          </button>
        </div>
      </form>
      <div className={styles.containerRide}>
        {data?.rides.map((ride) => (
          <CardRide
            key={ride.id}
            origin={ride.origin}
            destination={ride.destination}
            date={ride.date}
            driverName={ride.driver.name}
            distance={ride.distance}
            duration={ride.duration}
            value={ride.value}
          />
        ))}
      </div>
    </>
  )
}

export default RideFilterForm
