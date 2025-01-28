'use client'

import { useRouter } from 'next/navigation'
import styles from './styles.module.css'

function ButtonHistory() {
  const router = useRouter()
  return (
    <button className={styles.styledButton} onClick={() => router.push('/history')}>
      HISTÓRICO DE VIAGENS
    </button>
  )
}

export default ButtonHistory
