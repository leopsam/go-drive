import { Container, Info, SmallDynamicSize, LargeDynamicSize, ContainerDrivers, CardDrive, InfoDrive, ButtonSelection } from './styles'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import patchTripOptions from '../../services/patchTripOptionsApi'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaRegStar } from 'react-icons/fa'
import ButtonHistory from '../../components/ButtonHistory/index'
import Title from '../../components/TitleContainer/index'

interface RideEstimateData {
    origin: {
        latitude: number
        longitude: number
    }
    destination: {
        latitude: number
        longitude: number
    }
    distance: number
    duration: string
    options: [
        {
            id: number
            name: string
            description: string
            vehicle: string
            review: {
                rating: number
                comment: string
            }
            value: number
        },
    ]
    routeResponse: {
        response: object
        mapStatic: string
    }
}

interface RideEstimateBody {
    customerId: string
    origin: string
    destination: string
}

export default function Page() {
    const [data, setData] = useState<RideEstimateData | undefined>(undefined)
    const [body, setBody] = useState<RideEstimateBody | undefined>(undefined)
    const [driversData, setDriversData] = useState<object[] | undefined>(undefined)
    const [customerIdBody, setCustomerIdBody] = useState<string>('')
    const [originBody, setOriginBody] = useState<string>('')
    const [destinationBody, setDestinationBody] = useState<string>('')
    const [mapStatic, setMapStatic] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        const storedData = localStorage.getItem('rideEstimateData')
        const storedBody = localStorage.getItem('rideEstimateBody')
        if (storedData && storedBody) {
            setData(JSON.parse(storedData))
            setBody(JSON.parse(storedBody))
        }
    }, [])

    useEffect(() => {
        if (data && body) {
            setDriversData(data.options)
            setCustomerIdBody(body.customerId)
            setOriginBody(body.origin)
            setDestinationBody(body.destination)
            setMapStatic(data.routeResponse.mapStatic)
        }

    }, [body, data])

    const handleSelectDriver = (id: string, name: string, value: number) => {
        const body = {
            customer_id: customerIdBody,
            origin: originBody,
            destination: destinationBody,
            distance: data?.distance,
            duration: data?.duration,
            driver: {
                id,
                name,
            },
            value,
        }

        patchTripOptions(body)
            .then(data => {
                localStorage.removeItem('rideEstimateData')
                localStorage.removeItem('rideEstimateBody')
                navigate('/history')
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    return (
        <Container>
            <Info>
                <Title>Rota 🌎</Title>
                <SmallDynamicSize>
                    <img src={mapStatic} alt="Mapa Estático" />
                </SmallDynamicSize>
                <LargeDynamicSize>
                    <img src={mapStatic} alt="Mapa Estático" />
                </LargeDynamicSize>

                <ButtonHistory onClick={() => navigate('/history')}>HISTÓRICO DE VIAGENS</ButtonHistory>
            </Info>
            <ContainerDrivers>
                <Title>Escolha um motorista</Title>
                {driversData &&
                    driversData.map((drive: any) => (
                        <CardDrive key={drive.id}>
                            <InfoDrive>
                                <h1>{drive.name}</h1>
                                <h2>
                                    Valor da viagem: <span>R${drive.value.toFixed(2)}</span>
                                </h2>

                                <p>
                                    <strong>Descrição:</strong>
                                    {drive.description}
                                </p>
                                <p>
                                    <strong>Carro:</strong> {drive.vehicle}{' '}
                                </p>
                                <p>
                                    <strong>Avaliação:</strong>
                                    {Array.from({ length: drive.review.rating }).map((_, index) => (
                                        <FaStar key={`filled-${index}`} color="#ccad00" />
                                    ))}
                                    {Array.from({ length: 5 - drive.review.rating }).map((_, index) => (
                                        <FaRegStar key={`empty-${index}`} color="#ccad00" />
                                    ))}{' '}
                                    {drive.review.rating}/5 {drive.review.comment}
                                </p>
                            </InfoDrive>
                            <ButtonSelection type="button" onClick={() => handleSelectDriver(drive.id, drive.name, drive.value)}>
                                Escolher
                            </ButtonSelection>
                        </CardDrive>
                    ))
                }

                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
            </ContainerDrivers>
        </Container>
    )
}
