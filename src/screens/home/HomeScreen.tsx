import React from "react";
import { View, TextInput, FlatList, ActivityIndicator, Text, TouchableOpacity, Image } from "react-native";
import { useHomeController } from "../../controller/HomeController";
import { styles } from "../../constants/HomeStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParam = {
  Home: undefined;
  Detail: { pokemonUrl: string };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParam, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    pokemonList,
    filteredPokemonList,
    loading,
    loadingMore,
    searchQuery,
    handleSearch,
    handleLoadMore,
  } = useHomeController();

  const renderItem = ({ item }: { item: { id: number; name: string; imageUrl: string; url: string } }) => (
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

export default HomeScreen;
