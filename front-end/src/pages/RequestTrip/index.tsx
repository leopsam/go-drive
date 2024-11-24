import postRideEstimate from '../../services/api'
import { Container, Info, Form, InputItem, ButtonForm, TitleContainer, ButtonHistory } from './styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function Page() {
    const [customerId, setCustomerId] = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [textButton, setTextButton] = useState('ESTIMAR VALOR DA VIAGEM')
    const navigation = useNavigate()

    function submitTripRequest(e: any) {
        e.preventDefault()
        setTextButton('Carregando...')

        postRideEstimate(customerId, origin, destination)
            .then(data => {
                setTextButton('ESTIMAR VALOR DA VIAGEM')
                navigation('/confirm', { state: { data } })
                //navigation('/')
            })
            .catch((err: any) => {
                setTextButton('ESTIMAR VALOR DA VIAGEM')
                console.log(err)
            })
    }
    return (
        <Container>
            <Info>
                <TitleContainer>Bem vindo 🚗</TitleContainer>
                <p>
                    No projeto Go Drive, você poderá solicitar uma viagem em um carro particular de um ponto A até um ponto B. Ao fazer uma solicitação, será
                    necessário informar o ID do usuário, o endereço de origem e o endereço de destino para que possamos encontrar a melhor opção para você.
                </p>
                <p>
                    Além disso, após preencher essas informações, você poderá escolher entre algumas opções de motoristas disponíveis e visualizar os
                    valorespara sua viagem. Depois de escolher a opção ideal, você pode confirmar a sua solicitação de viagem.
                </p>
                <p>
                    Em qualquer momento, também será possível consultar o histórico das viagens realizadas, para que você tenha total controle sobre suas
                    viagens passadas.
                </p>
                <ButtonHistory>HISTÓRICO DE VIAGENS</ButtonHistory>
            </Info>
            <Form onSubmit={submitTripRequest}>
                <TitleContainer>Go Drive</TitleContainer>
                <InputItem>
                    <label htmlFor="customerId">Usuário:</label>
                    <input id="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)} placeholder="Informe o ID do usuário" />
                </InputItem>
                <InputItem>
                    <label htmlFor="origin">Origem:</label>
                    <input id="origin" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Informe o endereço de origem" />
                </InputItem>
                <InputItem>
                    <label htmlFor="destination">Destino:</label>
                    <input id="destination" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Informe o endereço de destino" />
                </InputItem>
                <ButtonForm type="submit">{textButton}</ButtonForm>
                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
            </Form>
        </Container>
    )
}
