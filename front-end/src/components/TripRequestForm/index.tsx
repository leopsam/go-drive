import { Form, TitleContainer, InputItem, ButtonSubmit } from './styles'
import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function TripRequestForm({
    customerId,
    origin,
    destination,
    textButton,
    setCustomerId,
    setOrigin,
    setDestination,
    submitTripRequest,
}: {
    customerId: string
    origin: string
    destination: string
    textButton: string
    setCustomerId: (value: string) => void
    setOrigin: (value: string) => void
    setDestination: (value: string) => void
    submitTripRequest: (event: React.FormEvent) => void
}) {
    return (
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
            <ButtonSubmit type="submit">{textButton}</ButtonSubmit>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} />
        </Form>
    )
}
