import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';
import HomePage from '../../ComponentView';
import React from 'react';
import { TextInput, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParam } from '../../ComponentView'; 

const feature = loadFeature('./src/pages/BoilerplatePages/__tests__/features/ComponentView.feature');

type HomePageProps = NativeStackScreenProps<RootStackParam, 'Home'>;

defineFeature(feature, (test) => {
  let HomePageWrapper: ShallowWrapper;
  let instance: HomePage;

  test('Render Pokemon List', ({ given, when, then }) => {
    given('I am on the Home Page', () => {
      const props: HomePageProps = {
        navigation: { navigate: jest.fn() } as any,
        route: { params: {} } as any
      };

      HomePageWrapper = shallow(<HomePage {...props} />);
    });

    when('I successfully load Home Page', () => {
      instance = HomePageWrapper.instance() as HomePage;
      instance.setState({ pokemonList: [], filteredPokemonList: [], loading: false });
    });

    then('I should see a search bar and Pokemon list', () => {
      const searchBar = HomePageWrapper.find(TextInput);
      expect(searchBar.exists()).toBe(true);

      const flatList = HomePageWrapper.find(FlatList);
      expect(flatList.exists()).toBe(true);
    });

    then('I should see the loading indicator when loading', () => {
      HomePageWrapper.setState({ loading: true });
      const activityIndicator = HomePageWrapper.find(ActivityIndicator);
      expect(activityIndicator.exists()).toBe(true);
    });

    then('I should see the Pokemon list when not loading', () => {
      HomePageWrapper.setState({ loading: false });
      const flatList = HomePageWrapper.find(FlatList);
      expect(flatList.exists()).toBe(true);
    });
  });
});
