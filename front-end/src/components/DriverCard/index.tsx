import { DriverCardProps } from '@/types'
import { FaRegStar, FaStar } from 'react-icons/fa'
import styles from './styles.module.css'

function DriverCard({ id, name, value, description, vehicle, rating, comment, onSelect }: DriverCardProps) {
  return (
    <div className={styles.cardDrive} key={id}>
      <div className={styles.infoDrive}>
        <h1>{name}</h1>
        <h2>
          Valor da viagem: <span>R${value.toFixed(2)}</span>
        </h2>
        <p>
          <strong>Descrição:</strong> {description}
        </p>
        <p>
          <strong>Carro:</strong> {vehicle}
        </p>
        <p>
          <strong>Avaliação:</strong>
          {Array.from({ length: rating }).map((_, index) => (
            <FaStar key={`filled-${index}`} color="#ccad00" />
          ))}
          {Array.from({ length: 5 - rating }).map((_, index) => (
            <FaRegStar key={`empty-${index}`} color="#ccad00" />
          ))}{' '}
          {rating}/5 {comment}
        </p>
      </div>
      <button className={styles.buttonSelection} type="button" onClick={() => onSelect(id, name, value)}>
        Escolher
      </button>
    </div>
  )
}

export default DriverCard
