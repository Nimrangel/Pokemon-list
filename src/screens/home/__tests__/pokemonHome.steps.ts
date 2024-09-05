import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import HomeScreen from "src/screens/home/HomeScreen";

const feature = loadFeature("./src/screens/home/__tests__/pokemonHome.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;

  test("User navigating to Pokemon Home Page", ({ given, when, then }) => {
    given("User on the Pokémon Home page", () => {
      wrapper = shallow(<HomeScreen />);
    });

    when("User fully loaded Pokémon home page", () => {
      const mockPokemonList = [
        {
          id: 1,
          name: "Bulbasaur",
          imageUrl: "bulbasaur.png",
          url: "/bulbasaur",
        },
        { id: 2, name: "Ivysaur", imageUrl: "ivysaur.png", url: "/ivysaur" },
      ];

      wrapper.setState({
        loading: false,
        pokemonList: mockPokemonList,
        filteredPokemonList: mockPokemonList,
      });

      wrapper.update();
    });

    then("User should see home page", () => {
      expect(
        wrapper
          .find("Text")
          .someWhere((node) => node.text() === "Home Page Title")
      ).toBe(true);
    });

    then("User should see loading", () => {
      expect(
        wrapper.find("Text").someWhere((node) => node.text() === "Loading...")
      ).toBe(true);
    });
  });
});
