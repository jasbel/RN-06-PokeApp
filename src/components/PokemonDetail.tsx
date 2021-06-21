import React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

const PokemonDetail = (props: Props) => {
  const {pokemon} = props;

  // console.log(JSON.stringify(pokemon, null, 4));

  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
        // position: 'absolute',
        // top: -100,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{...styles.wrap, marginTop: 320}}>
        {/* Header */}
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
        {/* End Header */}
        {/* Body */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20}} >
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicImage}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicImage}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicImage}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicImage}
          />
        </ScrollView>
      </View>

      <View style={{...styles.wrap}}>
        <Text style={styles.title}>Habilidades Base</Text>

        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              style={{...styles.regularText, marginRight: 10}}
              key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={{...styles.wrap}}>
        <Text style={styles.title}>Movimientos</Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              style={{...styles.regularText, marginRight: 10}}
              key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={{...styles.wrap}}>
        <Text style={styles.title}>Stats</Text>

        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={{flexDirection: 'row'}}>
              <Text style={{...styles.regularText, marginRight: 10, minWidth: 150,}}>
                {stat.stat.name}
              </Text>
              <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>
        <View style={{marginBottom: 80, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicImage}
          />
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
  basicImage: {
    width: 100,
    height: 100,
  },
});
