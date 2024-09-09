// HomePage.tsx
import React from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  View,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "../../constanst/HomeStyles";
import HomeController from "../BoilerplatePages/ComponentController";

export type RootStackParam = {
  Home: undefined;
  Detail: { pokemonUrl: string };
};

type HomePageProps = NativeStackScreenProps<RootStackParam, "Home">;

export default class HomePage extends HomeController<HomePageProps> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      ...this.state, 
      searchQuery: "",
      filteredPokemonList: [],
      loading: true,
      loadingMore: false,
      offset: 0,
    };
  }

  render(): JSX.Element {
    const { navigation } = this.props;
    const {
      filteredPokemonList,
      loading,
      loadingMore,
      searchQuery,
    } = this.state; 

    const renderItem = ({
      item,
    }: {
      item: { id: number; name: string; imageUrl: string; url: string };
    }) => (
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
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Pokemon by name or ID"
          value={searchQuery}
          onChangeText={this.handleSearch} 
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredPokemonList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={this.handleLoadMore} 
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            numColumns={2}
          />
        )}
      </SafeAreaView>
    );
  }
}
