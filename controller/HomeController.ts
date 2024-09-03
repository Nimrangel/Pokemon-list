import { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
}

export const useHomeController = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const limit = 20;

  useEffect(() => {
    fetchPokemonData(offset);
  }, []);

  const fetchPokemonData = async (offset: number) => {
    setLoadingMore(true);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await response.json();

      const fetchPromises = data.results.map(async (pokemon: any) => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();
        return {
          id: details.id,
          name: pokemon.name,
          imageUrl: details.sprites.front_default,
          url: pokemon.url,
        };
      });

      const pokemonData = await Promise.all(fetchPromises);
      const updatedList = [...pokemonList, ...pokemonData];
      setPokemonList(updatedList);
      setFilteredPokemonList(updatedList);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error(error);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchPokemonData(newOffset);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filteredData = pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase()) ||
        pokemon.id.toString().includes(text)
    );

    setFilteredPokemonList(filteredData);
  };

  return {
    pokemonList,
    filteredPokemonList,
    loading,
    loadingMore,
    searchQuery,
    handleLoadMore,
    handleSearch,
  };
};
