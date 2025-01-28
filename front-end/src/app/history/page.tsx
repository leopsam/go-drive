import { ToastContainer } from 'react-toastify'
import RideFilterForm from '@/components/RideFilterForm/index'
import TitleContainer from '@/components/TitleContainer/index'
import styles from './styles.module.css'

export default async function Page() {
  return (
    <div className={styles.container}>
      <div>
        <TitleContainer>Histórico 📘</TitleContainer>
        <div className={styles.msg}>
          Por favor, informe seu <strong>ID de usuário</strong> para que possamos personalizar sua experiência de viagens. Em seguida, escolha um{' '}
          <strong>motorista</strong> da lista abaixo para aplicar o filtro. Se desejar ver todas as viagens, basta selecionar a opção "Mostrar todos os
          motoristas". Após preencher, clique em <strong>"FILTRAR"</strong> para visualizar os resultados.
        </div>
      </div>
      <RideFilterForm />
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
    </div>
  )
}
