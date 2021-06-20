import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PokemonFull} from '../interfaces/pokemonInterfaces';

interface Props {
  pokemon: PokemonFull;
}

const PokemonDetail = (props: Props) => {
  const {pokemon} = props;

  console.log(JSON.stringify(pokemon, null, 4));

  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        backgroundColor: 'red',
      }}>
      <View style={{...styles.wrap}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>{pokemon.name}</Text>

          {pokemon.types.map(({type}) => (
            <Text style={styles.regularText} key={type.name}>
              {type.name + type.url}
            </Text>
          ))}

          <Text style={styles.title}>Peso</Text>
          <Text style={styles.title}>{pokemon.weight}Kg</Text>
        </View>

        <View style={{...styles.wrap}}>
          <Text style={styles.title}>Sprites</Text>
          {pokemon.types.map(({type}) => (
            <Text style={styles.title} key={type.name}>
              {type.name + type.url}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetail;

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  regularText: {
    fontSize: 17,
  },
});
