import { useState } from "react";
import { useEffect, useRef } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

const usePokemonPaginated = () => {
    // const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
    const [isLoading, setIsLoading] = useState(false);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const nextPegeUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async () => {
        setIsLoading(true);

        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPegeUrl.current);
        nextPegeUrl.current = resp.data.next;
        mapPokemonListToSimple(resp.data.results);
    };

    const mapPokemonListToSimple = ( pokemonList: Result[] ) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url})=>{
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {id, picture, name}
        })

        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
        setIsLoading(false);

    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons,
    }
}

export default usePokemonPaginated
