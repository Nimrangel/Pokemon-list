import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  const { pokemonUrl } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => setPokemonDetails(data))
      .catch((error) => console.error(error));
  }, [pokemonUrl]);

  if (!pokemonDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const abilities = pokemonDetails.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  const stats = pokemonDetails.stats.map((stat) => (
    <Text key={stat.stat.name} style={styles.detail}>
      {stat.stat.name}: {stat.base_stat}
    </Text>
  ));

  const firstType = pokemonDetails.types[0]?.type.name;

  const getTypeDetails = (type) => {
    switch (type.toLowerCase()) {
      case "electric":
        return {
          borderColor: "black",
          backgroundColor: "#FFD700",
          emoji: "⚡",
        };
      case "water":
        return {
          borderColor: "black",
          backgroundColor: "#4682B4",
          emoji: "💧",
        };
      case "fire":
        return {
          borderColor: "black",
          backgroundColor: "#FF5733",
          emoji: "🔥",
        };
      case "grass":
        return {
          borderColor: "black",
          backgroundColor: "#66cc66",
          emoji: "🍀",
        };
      case "poison":
        return {
          borderColor: "black",
          backgroundColor: "#800080",
          emoji: "💀",
        };
      case "ground":
        return {
          borderColor: "black",
          backgroundColor: "#895129",
          emoji: "🗻",
        };
      case "psychic":
        return {
          borderColor: "black",
          backgroundColor: "violet",
          emoji: "👁",
        };
      default:
        return {
          borderColor: "black",
          backgroundColor: "#a0a0a0",
          emoji: "❓",
        };
    }
  };

  const { borderColor, emoji, backgroundColor } = getTypeDetails(firstType);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={styles.pokemonName}>{pokemonDetails.name}</Text>
      <Image
        source={{ uri: pokemonDetails.sprites.front_default }}
        style={styles.pokemonImage}
      />
      <View style={styles.typeContainer}>
        <View style={[styles.badge, { borderColor }]}>
          <Text style={styles.typeEmoji}>{emoji}</Text>
          <Text style={styles.detail}>{firstType}</Text>
        </View>
      </View>

      <View style={styles.abilitiesContainer}>
        <Text style={styles.detail}>Abilities: {abilities}</Text>
      </View>

      <View style={styles.statsRowContainer}>
        <View style={styles.statsColumn}>
          <Text style={styles.statsHeader}>Stats:</Text>
          {stats}
        </View>
        <View style={styles.secondStatsColumn}>
          <Text style={styles.detail}>Height: {pokemonDetails.height}</Text>
          <Text style={styles.detail}>Weight: {pokemonDetails.weight}</Text>
          <Text style={styles.detail}>
            Base Experience: {pokemonDetails.base_experience}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonName: {
    fontSize: 24,
    textTransform: "capitalize",
    marginTop: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  pokemonImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
    color: "black",
    fontWeight: "bold",
  },
  statsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "black",
  },
  statsRowContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  statsColumn: {
    flex: 1,
    padding: 10,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  secondStatsColumn: {
    flex: 1,
    padding: 10,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  typeContainer: {
    marginBottom: 40,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 4,
  },
  typeEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  abilitiesContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
});

export default DetailsScreen;
