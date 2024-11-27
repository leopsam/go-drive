import React from 'react'
import { Form, InputItem, ButtonSubmit } from './styles'

export default function RideFilterForm({
    customerId,
    driverId,
    setCustomerId,
    setDriverId,
    handleSelectRide,
}: {
    customerId: string
    driverId: string
    setCustomerId: (value: string) => void
    setDriverId: (value: string) => void
    handleSelectRide: (event: React.FormEvent) => void
}) {
    return (
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
                <ButtonSubmit type="submit">FILTRAR</ButtonSubmit>
            </InputItem>
        </Form>
    )
}
