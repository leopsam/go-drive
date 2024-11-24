import { useLocation } from 'react-router-dom'
import { Container, Info, SmallDynamicSize, LargeDynamicSize, ContainerDrivers, CardDrive, InfoDrive, TitleContainer, ButtonHistory } from './styles'
import { ToastContainer } from 'react-toastify'

export default function Page() {
    const location = useLocation()
    const data = location.state?.data
    //const apiKey = process.env.GOOGLE_API_KEY
    const apiKey = ''
    const origin = `${data.origin.latitude},${data.origin.longitude}`
    const destination = `${data.destination.latitude},${data.destination.longitude}`
    const markers = `markers=color:red%7Clabel:A%7C${origin}&markers=color:red%7Clabel:B%7C${destination}`
    const polyline = data.routeResponse.routes[0].polyline.encodedPolyline
    const encodedPolyline = encodeURIComponent(polyline)
    const drivers: object[] = data.options

    console.log(data)

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

                <ButtonHistory>HISTÓRICO DE VIAGENS</ButtonHistory>
            </Info>
            <ContainerDrivers>
                <TitleContainer>Escolha um motorista</TitleContainer>
                {drivers.map((drive: any) => (
                    <CardDrive>
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
                        <ButtonHistory>Escolher</ButtonHistory>
                    </CardDrive>
                ))}

                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
            </ContainerDrivers>
        </Container>
    )
}
