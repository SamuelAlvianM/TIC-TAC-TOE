import { render, screen } from '@testing-library/react'
import PokemonDetail from '@/pages/pokemon/[name]'
import { useRouter } from 'next/router'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// Mock untuk next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}))

describe('PokemonDetail Page', () => {
  // Setup mock 
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
    isFallback: false
  }
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  })


  // Test untuk error state
  it('menampilkan pesan error ketika ada kesalahan', () => {
    render(<PokemonDetail 
      pokemon={null} 
      species={null} 
      error="Pokemon tidak ditemukan" 
    />)
    
    expect(screen.getByText('Pokemon tidak ditemukan')).toBeInTheDocument()
    expect(screen.getByText('Go to Search')).toBeInTheDocument()
  })

  // Test untuk successful render
  it('menampilkan detail Pokemon dengan benar', () => {
    const mockPokemon = {
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
    }

    const mockSpecies = {
      flavor_text_entries: [{
        flavor_text: 'Ini adalah Pokemon listrik yang lucu',
        language: { name: 'en' }
      }]
    }

    render(<PokemonDetail 
      pokemon={mockPokemon} 
      species={mockSpecies} 
      error={null} 
    />)
    
    // Test data dasar
    expect(screen.getByText('pikachu')).toBeInTheDocument()
    expect(screen.getByText(/electric/)).toBeInTheDocument()
    
    // Test stats
    expect(screen.getByText(/hp: 55/)).toBeInTheDocument()
    expect(screen.getByText(/attack: 40/)).toBeInTheDocument()
    
    // Test physical attributes
    expect(screen.getByText(/Height: 0.4m/)).toBeInTheDocument()
    expect(screen.getByText(/Weight: 6kg/)).toBeInTheDocument()
    
    // Test description
    expect(screen.getByText('Ini adalah Pokemon listrik yang lucu')).toBeInTheDocument()
  })

}) 