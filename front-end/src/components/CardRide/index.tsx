import React from 'react'
import { CardRideProps } from '@/types'
import styles from './styles.module.css'

function CardRide({ origin, destination, date, driverName, distance, duration, value }: CardRideProps) {
  function convertSeconds(seconds: string) {
    const totalSeconds = Number(seconds.slice(0, -1))
    const hours = Math.floor(totalSeconds / 3600)
    const remainingSecondsAfterHours = totalSeconds % 3600
    const minutes = Math.floor(remainingSecondsAfterHours / 60)
    return `${hours} horas, ${minutes} minutos`
  }
  return (
    <div className={styles.cardRide}>
      <h1>Origem: {origin}</h1>
      <h1>Destino: {destination}</h1>
      <p>
        <strong>Data e Hora: </strong>
        {new Date(date)
          .toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
          .replace(',', ' -')}
      </p>
      <p>
        <strong>Motorista: </strong>
        {driverName}
      </p>
      <p>
        <strong>Distância: </strong>
        {(distance / 1000).toFixed(2)} km
      </p>
      <p>
        <strong>Tempo :</strong> {convertSeconds(duration)}
      </p>
      <h1>
        Valor: <span>R${value.toFixed(2)}</span>
      </h1>
    </div>
  )
}

export default CardRide
