import { render, screen, fireEvent } from '@testing-library/react'
import PokemonSearch from '../../../pages/pokemon'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('PokemonSearch Page', () => {
    const mockRouter = {
    push: jest.fn(),
    back: jest.fn()
    }

    beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
    })

it('melakukan pencarian dengan benar', () => {
    render(<PokemonSearch />)
    
    const input = screen.getByPlaceholderText('Enter Pokemon name...')
    const searchButton = screen.getByText('Search')

    fireEvent.change(input, { target: { value: 'pikachu' } })
    fireEvent.click(searchButton)

    expect(mockRouter.push).toHaveBeenCalledWith('/pokemon/pikachu')
})

it('menampilkan daftar pokemon populer', () => {
    render(<PokemonSearch />)
    
    const popularPokemon = ['pikachu', 'charizard', 'bulbasaur']
    popularPokemon.forEach(name => {
    expect(screen.getByText(name)).toBeInTheDocument()
        })
    })
}) 