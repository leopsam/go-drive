//import { useLocation } from 'react-router-dom'
import { Container, Info, SmallDynamicSize, LargeDynamicSize, ContainerDrivers, CardDrive, InfoDrive, TitleContainer, ButtonHistory } from './styles'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import patchTripOptions from '../../services/patchTripOptionsApi'
import { useNavigate } from 'react-router-dom'

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
    routeResponse: {
        routes: {
            polyline: {
                encodedPolyline: string
            }
        }[]
    }
    options: object[]
}

interface RideEstimateBody {
    customerId: string
    origin: string
    destination: string
}

export default function Page() {
    const apiKey = "AIzaSyAlNS_sQ5t7DzIdAOSSsQMgBmRzGyzk8EQ"
    const [data, setData] = useState<RideEstimateData | undefined>(undefined)
    const [body, setBody] = useState<RideEstimateBody | undefined>(undefined)
    const [driversData, setDriversData] = useState<object[] | undefined>(undefined)
    const [markers, setMarkers] = useState<string>('')
    const [encodedPolyline, setEncodedPolyline] = useState<string>('')
    const [customerIdBody, setCustomerIdBody] = useState<string>('')
    const [originBody, setOriginBody] = useState<string>('')
    const [destinationBody, setDestinationBody] = useState<string>('')
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
            const originData = `${data.origin.latitude},${data.origin.longitude}`
            const destinationData = `${data.destination.latitude},${data.destination.longitude}`
            setDriversData(data.options)
            setEncodedPolyline(encodeURIComponent(data.routeResponse.routes[0].polyline.encodedPolyline))
            setCustomerIdBody(body.customerId)
            setOriginBody(body.origin)
            setDestinationBody(body.destination)
            setMarkers(`markers=color:red%7Clabel:A%7C${originData}&markers=color:red%7Clabel:B%7C${destinationData}`)
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
                <TitleContainer>Rota 🌎</TitleContainer>
                <SmallDynamicSize>
                    <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?size=200x200&${markers}&path=weight:3%7Ccolor:blue%7Cenc:${encodedPolyline}&key=${apiKey}`}
                        alt="Mapa Estático"
                    />
                </SmallDynamicSize>
                <LargeDynamicSize>
                    <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?size=400x400&${markers}&path=weight:3%7Ccolor:blue%7Cenc:${encodedPolyline}&key=${apiKey}`}
                        alt="Mapa Estático"
                    />
                </LargeDynamicSize>

                <ButtonHistory onClick={() => navigate('/history')}>HISTÓRICO DE VIAGENS</ButtonHistory>
            </Info>
            <ContainerDrivers>
                <TitleContainer>Escolha um motorista</TitleContainer>
                {!driversData ? (
                    <h1>Carregando...</h1>
                ) : (
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
                                    <strong>Avaliação:</strong> {drive.review.rating} {drive.review.comment}
                                </p>
                            </InfoDrive>
                            <ButtonHistory type="button" onClick={() => handleSelectDriver(drive.id, drive.name, drive.value)}>
                                Escolher
                            </ButtonHistory>
                        </CardDrive>
                    ))
                )}

                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
            </ContainerDrivers>
        </Container>
    )
}
