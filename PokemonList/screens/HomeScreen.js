import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 20;

  useEffect(() => {
    fetchPokemonData(offset);
  }, []);

  const fetchPokemonData = (offset) => {
    setLoadingMore(true);

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchPromises = data.results.map((pokemon, index) =>
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((details) => ({
              id: details.id,
              name: pokemon.name,
              imageUrl: details.sprites.front_default,
              url: pokemon.url,
            }))
        );

        Promise.all(fetchPromises)
          .then((pokemonData) => {
            const updatedList = [...pokemonList, ...pokemonData];
            setPokemonList(updatedList);
            setFilteredPokemonList(updatedList);
            setLoading(false);
            setLoadingMore(false);
          })
          .catch((error) => {
            console.error(error);
            setLoadingMore(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setLoadingMore(false);
      });
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setOffset((prevOffset) => prevOffset + limit);
      fetchPokemonData(offset + limit);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);

    const filteredData = pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase()) ||
        pokemon.id.toString().includes(text)
    );

    setFilteredPokemonList(filteredData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { pokemonUrl: item.url })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.pokemonImage} />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <Text>(#{item.id})</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" />;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokemon by name or ID"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPokemonList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "black",
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "grey",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "grey",
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonInfo: {
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 16,
    textTransform: "capitalize",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default HomeScreen;
