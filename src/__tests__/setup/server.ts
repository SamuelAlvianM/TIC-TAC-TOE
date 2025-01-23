import { setupServer } from 'msw/node'
import { handlerPokemon } from '../__mocks__/pokemon.handlers'

export const server = setupServer(...handlerPokemon)

// ini dummy test 
describe('MSW Server Setup', () => {
    it('should be defined', () => {
        expect(server).toBeDefined()
    })
}) 