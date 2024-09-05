import React from 'react';
import { shallow } from 'enzyme';
import HomeScreen from 'src/screens/home/HomeScreen';
import { ActivityIndicator, FlatList } from 'react-native';

describe('HomeScreen', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<HomeScreen navigation={{ navigate: jest.fn() }} />);
  });

  it('should render the search bar', () => {
    expect(wrapper.find('TextInput').length).toBe(1);
  });

  it('should display loading indicator when loading', () => {
    wrapper.setState({ loading: true });
    expect(wrapper.find(ActivityIndicator).length).toBe(1);
  });

  it('should render a list of Pokémon', () => {
    wrapper.setState({
      loading: false,
      filteredPokemonList: [{ id: 1, name: 'Bulbasaur', imageUrl: '', url: '' }],
    });
    expect(wrapper.find(FlatList).length).toBe(1);
  });

  it('should handle search input change', () => {
    const searchQuery = 'Pikachu';
    const textInput = wrapper.find('TextInput');
    textInput.simulate('changeText', searchQuery);
    expect(wrapper.find(FlatList).prop('data')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringContaining(searchQuery.toLowerCase()),
        }),
      ]),
    );
  });
});
