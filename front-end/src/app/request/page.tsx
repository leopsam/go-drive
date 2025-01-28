import ButtonHistory from '@/components/ButtonHistory/index'
import TitleContainer from '@/components/TitleContainer/index'
import TripRequestForm from '@/components/TripRequestForm/index'
import styles from './styles.module.css'

export default function RequestTrip() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <TitleContainer>Bem vindo 🚗</TitleContainer>
        <p>
          No projeto Go Drive, você poderá solicitar uma viagem em um carro particular de um ponto A até um ponto B. Ao fazer uma solicitação, será necessário
          informar o ID do usuário, o endereço de origem e o endereço de destino para que possamos encontrar a melhor opção para você.
        </p>
        <p>
          Além disso, após preencher essas informações, você poderá escolher entre algumas opções de motoristas disponíveis e visualizar os valorespara sua
          viagem. Depois de escolher a opção ideal, você pode confirmar a sua solicitação de viagem.
        </p>
        <p>
          Em qualquer momento, também será possível consultar o histórico das viagens realizadas, para que você tenha total controle sobre suas viagens
          passadas.
        </p>
        <ButtonHistory />
      </div>
      <TripRequestForm />
    </div>
  )
}
