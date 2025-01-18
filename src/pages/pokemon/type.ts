export interface PokemonData {
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
    };
    height: number;
    weight: number;
    types: {
    type: {
        name: string;
        };
    }[];
    stats: {
            base_stat: number;
            stat: {
                name: string;
        };
        }[];
    }


    export interface PokemonSpecies {
        flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
        }[];
    }
    
    export interface Props {
        pokemon: PokemonData | null;
        species: PokemonSpecies | null;
        error?: string | null;
    }
