import rideServices from '../../services/rideServices'

describe('Calculate route and list drivers', () => {
    it('deve lançar erro se origem e destino forem iguais', async () => {
        const origin = 'Rua Aratiba, Nova Iguaçu, RJ'
        const destination = 'Rua Aratiba, Nova Iguaçu, RJ'

        const response = rideServices.calculateRouteAndListDrivers(origin, destination, '123')

        await expect(response).rejects.toMatchObject({
            error_code: 'INVALID_DATA',
            error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        })
    })
})
