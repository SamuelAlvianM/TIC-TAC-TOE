import { Props } from "./type";
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import {useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    try {
        if (!params?.name) {
        return {
            props: {
                pokemon: null,
                species: null,
                error: 'Pokemon name is required'
            }
        };
        }
    
        const [pokemonRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.name}`)
        ]);
    
        if (!pokemonRes.ok || !speciesRes.ok) {
        throw new Error('Pokemon not found');
        }
    
        const pokemon = await pokemonRes.json();
        const species = await speciesRes.json();
    
        return {
        props: {
            pokemon,
            species,
            error: null,
        }
        };
    } catch (error) {
        return {
        props: {
            pokemon: null,
            species: null,
            error: error instanceof Error ? error.message : 'Failed to fetch Pokemon data'
        }
        };
    }
    };
    

export default function PokemonDetail({ pokemon, species, error }: Props) {
    const [showBackSprite, setShowBackSprite] = useState(false);
    const router = useRouter();

if (router.isFallback) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
    );
}

if (error || !pokemon || !species) {
    return (
    <div className="max-w-2xl mx-auto p-6 text-center mt-10">
        <button
        onClick={() => router.back()}
        className="bg-emerald-300 px-3 py-3 text-black font-bold rounded-2xl hover:bg-cyan-300 "
        >Back</button>

        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600">{error || 'Failed to load Pokemon data'}</p>
        <button
        onClick={() => router.push(`/pokemon/search`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Go to Search
        </button>
    </div>
    );
}

const description = species.flavor_text_entries
    ?.find(entry => entry.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ') || 'No description available';

return (
    <div className="max-w-2xl text-stone-700 mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
        <button
        onClick={() => router.back()}
        className="bg-red-300 px-3 py-3 text-black font-bold rounded-2xl hover:bg-cyan-300 "
        >Back</button>
    
    <h1 className="text-4xl font-bold text-center capitalize mb-6">{pokemon.name}</h1>
    
    <div className="flex flex-col items-center mb-8">
        <div 
        className="relative w-64 h-64 cursor-pointer"
        onClick={() => setShowBackSprite(!showBackSprite)}
        >
        {pokemon.sprites && (
            <Image
            src={showBackSprite ? pokemon.sprites.back_default : pokemon.sprites.front_default}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
            />
        )}
        </div>
        <p className="text-sm text-gray-500 mt-2">Click sprite to rotate</p>
    </div>

    <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{description}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
        <h2 className="text-xl font-semibold mb-2">Details</h2>
        <ul className="space-y-2">
            <li>Height: {pokemon.height / 10}m</li>
            <li>Weight: {pokemon.weight / 10}kg</li>
            <li>
            Types: {pokemon.types.map(t => t.type.name).join(', ')}
            </li>
        </ul>
        </div>

        <div>
        <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
        <ul className="space-y-2">
            {pokemon.stats.map(stat => (
            <li key={stat.stat.name} className="capitalize">
                {stat.stat.name}: {stat.base_stat}
            </li>
            ))}
        </ul>
        </div>
    </div>
    </div>
    );
}