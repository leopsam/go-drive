import { MapSectionProps } from '@/types'
import styles from './styles.module.css'

function MapSection({ mapStatic }: MapSectionProps) {
  return (
    <>
      <div className={styles.smallDynamicSize}>
        <img src={mapStatic} alt="Mapa Estático" />
      </div>
      <div className={styles.largeDynamicSize}>
        <img src={mapStatic} alt="Mapa Estático" />
      </div>
    </>
  )
}

export default MapSection
