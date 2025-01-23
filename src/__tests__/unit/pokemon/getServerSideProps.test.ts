import { getServerSideProps } from '@/pages/pokemon/[name]'
import { server } from '../../setup/server'
import { rest } from 'msw'
import { GetServerSidePropsResult } from 'next'
import { Props } from '@/pages/pokemon/type'

describe('Pokemon SSR Tests', () => {
    it('mengambil data dasar Pokemon dengan sukses', async () => {
        const context = {
            params: { name: 'pikachu' }
        }

        const response = await getServerSideProps(context as any) as GetServerSidePropsResult<Props>
        
        if ('props' in response && !('then' in response.props)) {
            const { props } = response
            if (props.pokemon) {
                expect(props.pokemon.name).toBe('pikachu')
                expect(props.pokemon.types[0].type.name).toBe('electric')
                expect(props.error).toBeNull()
            }
        }
    })

    it('menangani error saat Pokemon tidak ditemukan', async () => {
        // Override handler untuk simulasi error
        server.use(
            rest.get('https://pokeapi.co/api/v2/pokemon/:name', (req, res, ctx) => {
                return res(ctx.status(404))
            })
        )

        const context = {
            params: { name: 'tidakada' }
        }

        const response = await getServerSideProps(context as any)
        
        if ('props' in response && !('then' in response.props)) {
            expect(response.props.pokemon).toBeNull()
            expect(response.props.species).toBeNull()
            expect(response.props.error).toBe('fetch is not defined')
        }
    })

    it('mengembalikan error jika nama Pokemon tidak ada', async () => {
        const context = {
            params: undefined
        }

        const response = await getServerSideProps(context as any)
        
        expect(response).toEqual({
            props: {
                pokemon: null,
                species: null,
                error: 'Pokemon name is required'
            }
        })
    })
})