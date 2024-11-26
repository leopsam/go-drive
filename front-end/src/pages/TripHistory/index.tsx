import getTripHistory from '../../services/getTripHistoryApi'
import { Container, Form, InputItem, CardRide, Msg, ContainerRide, TitleContainer, ButtonHistory } from './styles'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'

interface TripHistory {
    customer_id: string
    rides: {
        id: number
        date: string
        origin: string
        destination: string
        distance: number
        duration: string
        driver: {
            id: number
            name: string
        }
        value: number
    }[]
}

export default function Page() {
    const [data, setData] = useState<TripHistory | null>(null)
    const [customerId, setCustomerId] = useState<string>('')
    const [driverId, setDriverId] = useState<string>('')

    const handleSelectRide = (e: any) => {
        e.preventDefault()
        setData(null)

        getTripHistory(customerId, driverId)
            .then((data: TripHistory) => {
                setData(data)
                console.log(data)
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    return (
        <Container>
            <div>
                <TitleContainer>Histórico 📘</TitleContainer>
                <Msg>
                    Por favor, informe seu <strong>ID de usuário</strong> para que possamos personalizar sua experiência de viagens. Em seguida, escolha um{' '}
                    <strong>motorista</strong> da lista abaixo para aplicar o filtro. Se desejar ver todas as viagens, basta selecionar a opção "Mostrar todos
                    os motoristas". Após preencher, clique em <strong>"FILTRAR"</strong> para visualizar os resultados.
                </Msg>
            </div>
            <Form onSubmit={handleSelectRide}>
                <InputItem>
                    <label htmlFor="customerId">Usuário:</label>
                    <input id="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)} placeholder="Informe o ID do usuário" />
                </InputItem>
                <InputItem>
                    <label htmlFor="seletor">Motorista:</label>
                    <select id="seletor" name="seletor" value={driverId} onChange={e => setDriverId(e.target.value)}>
                        <option value="">Mostrar todos os motoristas</option>
                        <option value="1">Homer Simpson</option>
                        <option value="2">Dominic Toretto</option>
                        <option value="3">James Bond</option>
                    </select>
                </InputItem>
                <InputItem>
                    <ButtonHistory type="submit">FILTRAR</ButtonHistory>
                </InputItem>
            </Form>
            <div>
                {data && (
                    <ContainerRide>
                        {data.rides.map(ride => (
                            <CardRide key={ride.id}>
                                <h1>Origem: {ride.origin}</h1>
                                <h1>Destino: {ride.destination}</h1>
                                <p>
                                    <strong>Data e Hora: </strong>
                                    {new Date(ride.date)
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
                                    {ride.driver.name}
                                </p>
                                <p>
                                    <strong>Distância: </strong>
                                    {ride.distance}
                                </p>
                                <p>
                                    <strong>Tempo :</strong>
                                    {ride.duration}
                                </p>
                                <h1>
                                    Valor: <span>R${ride.value.toFixed(2)}</span>
                                </h1>
                            </CardRide>
                        ))}
                    </ContainerRide>
                )}
                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
            </div>
        </Container>
    )
}
