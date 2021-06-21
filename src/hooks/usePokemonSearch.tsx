import { useState } from "react";
import { useEffect, useRef } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

const usePokemonSearch = () => {
    // const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
    const [isFetching, setIsFetching] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const loadPokemons = async () => {
        setIsFetching(true);

        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1120');
        mapPokemonListToSimple(resp.data.results);
    };

    const mapPokemonListToSimple = ( pokemonList: Result[] ) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url})=>{
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {id, picture, name}
        })

        setSimplePokemonList(newPokemonList);
        setIsFetching(false);

    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isFetching,
        simplePokemonList,
    }
}

export default usePokemonSearch
