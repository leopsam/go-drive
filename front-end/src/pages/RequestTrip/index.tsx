import postRideEstimate from '../../services/postRideEstimateApi'
import { Container, Info } from './styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TripRequestForm from '../../components/TripRequestForm/index'
import Title from '../../components/TitleContainer/index'
import ButtonHistory from '../../components/ButtonHistory/index'

export default function Page() {
    const [customerId, setCustomerId] = useState('')
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [textButton, setTextButton] = useState('ESTIMAR VALOR DA VIAGEM')
    const navigate = useNavigate()

    function submitTripRequest(e: any) {
        e.preventDefault()
        setTextButton('Carregando...')

        postRideEstimate(customerId, origin, destination)
            .then(data => {
                localStorage.setItem('rideEstimateData', JSON.stringify(data))
                localStorage.setItem('rideEstimateBody', JSON.stringify({ customerId, origin, destination }))
                setTextButton('ESTIMAR VALOR DA VIAGEM')
                navigate('/confirm')
            })
            .catch((err: any) => {
                setTextButton('ESTIMAR VALOR DA VIAGEM')
                console.log(err)
            })
    }
    return (
        <Container>
            <Info>
                <Title>Bem vindo 🚗</Title>
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
                <ButtonHistory onClick={() => navigate('/history')}>HISTÓRICO DE VIAGENS</ButtonHistory>
            </Info>
            <TripRequestForm
                customerId={customerId}
                origin={origin}
                destination={destination}
                textButton={textButton}
                setCustomerId={setCustomerId}
                setOrigin={setOrigin}
                setDestination={setDestination}
                submitTripRequest={submitTripRequest}
            />
        </Container>
    )
}
