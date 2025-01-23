//  pertama tama untuk MSW kamu harus install ini
// npm install --save-dev @testing-library/react @testing-library/jest-dom msw jest jest-environment-jsdom
//  terus buat deh mock nya  ini yang punya ku 


import { rest } from 'msw'

export const handlerPokemon = [
    // Mock untuk data dasar Pokemon
    rest.get('https://pokeapi.co/api/v2/pokemon/:name', (req, res, ctx) => {
        return res(
            ctx.json({
                name: 'pikachu',
                sprites: {
                    front_default: '/pikachu-front.png',
                    back_default: '/pikachu-back.png'
                },
                height: 4,
                weight: 60,
                types: [{ type: { name: 'electric' } }],
                stats: [
                    { base_stat: 55, stat: { name: 'hp' } },
                    { base_stat: 40, stat: { name: 'attack' } }
                ]
            })
        )
    }),

    // Mock untuk species/habitat Pokemon
    rest.get('https://pokeapi.co/api/v2/pokemon-species/:name', (req, res, ctx) => {
        return res(
            ctx.json({
                flavor_text_entries: [
                    {
                        flavor_text: 'Hidup di hutan dan padang rumput',
                        language: { name: 'en' }
                    }
                ],
                habitat: {
                    name: 'forest'
                }
            })
        )
    })
]