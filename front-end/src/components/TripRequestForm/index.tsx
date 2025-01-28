'use client'

import React from 'react'
import { useState } from 'react'
import postRideEstimate from '@/services/postRideEstimateApi'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import styles from './styles.module.css'

function TripRequestForm() {
  const [customerId, setCustomerId] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [textButton, setTextButton] = useState('ESTIMAR VALOR DA VIAGEM')
  const router = useRouter()

  function submitTripRequest(e: any) {
    e.preventDefault()
    setTextButton('Carregando...')

    postRideEstimate(customerId, origin, destination)
      .then((data) => {
        localStorage.setItem('rideEstimateData', JSON.stringify(data))
        localStorage.setItem('rideEstimateBody', JSON.stringify({ customerId, origin, destination }))
        setTextButton('ESTIMAR VALOR DA VIAGEM')
        router.push('/confirm')
      })
      .catch((err: any) => {
        setTextButton('ESTIMAR VALOR DA VIAGEM')
        console.log(err)
      })
  }

  return (
    <form className={styles.formStyle} onSubmit={submitTripRequest}>
      <div className={styles.titleContainer}>Go Drive</div>
      <div className={styles.inputItem}>
        <label htmlFor="customerId">Usuário:</label>
        <input id="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Informe o ID do usuário" />
      </div>
      <div className={styles.inputItem}>
        <label htmlFor="origin">Origem:</label>
        <input id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Informe o endereço de origem" />
      </div>
      <div className={styles.inputItem}>
        <label htmlFor="destination">Destino:</label>
        <input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Informe o endereço de destino" />
      </div>
      <button className={styles.buttonSubmit} type="submit">
        {textButton}
      </button>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
    </form>
  )
}

export default TripRequestForm
