
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PokemonSearch() {
const [searchTerm, setSearchTerm] = useState('');
const router = useRouter();

const popularPokemon = [
    'pikachu',
    'charizard',
    'bulbasaur',
    'squirtle',
    'mewtwo',
    'gengar',
    'gyarados',
    'dragonite'
];

const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
    router.push(`/pokemon/${searchTerm.toLowerCase()}`);
    }
};

return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
        <button
        onClick={() => router.back()}
        className="bg-red-300 px-3 py-3 text-black font-bold rounded-2xl hover:bg-cyan-300 "
        >Back</button>

    <h1 className="text-4xl font-bold text-center mb-8">Pokemon Search</h1>
    
    <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Pokemon name..."
            className=" text-purple-700 flex-1 p-3 border-2 border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <button
            type="submit"
            className="bg-emerald-300 px-6 py-3 text-black font-bold rounded-lg hover:bg-cyan-300"
            disabled={!searchTerm.trim()}
        >
            Search
        </button>
        </div>
    </form>

    <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Popular Pokemon:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {popularPokemon.map((name) => (
            <Link 
            key={name}
            href={`/pokemon/${name}`}
            className="bg-emerald-300 px-4 py-2 text-black font-bold rounded-lg hover:bg-cyan-300 text-center capitalize"
            >
            {name}
            </Link>
        ))}
        </div>
    </div>

    <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Search Tips:</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Enter the Pokemon's name in English</li>
        <li>Names are not case-sensitive</li>
        <li>Make sure to spell the name correctly</li>
        <li>You can search for any Pokemon from generation 1-8</li>
        </ul>
    </div>

    <div className="mt-8 p-4 bg-gray-900 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Try these Pokemon:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="space-y-2">
            <h3 className="font-semibold">Starters:</h3>
            <p className="text-gray-600">Charmander, Bulbasaur, Squirtle</p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold">Legendaries:</h3>
            <p className="text-gray-600">Mewtwo, Lugia, Rayquaza</p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold">Popular:</h3>
            <p className="text-gray-600">Eevee, Snorlax, Garchomp</p>
        </div>
        </div>
    </div>
    </div>
);
}