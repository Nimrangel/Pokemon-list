import React from 'react';
import { shallow } from 'enzyme';
import DetailsComponent from 'src/components/DetailsComponent';
import { View, Text } from 'react-native';

const mockRoute = {
  params: {
    pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
};

describe('DetailsComponent', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<DetailsComponent route={mockRoute} />);
  });

  it('should render the loading state initially', () => {
    expect(wrapper.find(View).length).toBe(1);
    expect(wrapper.find(Text).first().text()).toBe('Loading...');
  });

  it('should display Pokémon details after fetching', () => {
    wrapper.setState({
      pokemonDetails: {
        id: 1,
        name: 'bulbasaur',
        abilities: [{ ability: { name: 'overgrow' } }],
        sprites: { front_default: '' },
        types: [{ type: { name: 'grass' } }],
        stats: [],
        height: 7,
        weight: 69,
        base_experience: 64,
      },
    });

    expect(wrapper.find(Text).someWhere(n => n.text() === 'bulbasaur')).toBe(true);
    expect(wrapper.find(Text).someWhere(n => n.text().includes('Abilities:'))).toBe(true);
  });
});
