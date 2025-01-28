import styles from './styles.module.css'

export default function Title({ children }: { children: string }) {
  return <div className={styles.titleContainer}>{children}</div>
}
