import React from 'react';
import {Dimensions, FlatList, Image, Platform} from 'react-native';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import stylesApp from '../theme/appTheme';
import {useState, useEffect} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokeById= simplePokemonList.find(poke => poke.id===term)
      setPokemonFiltered(
        pokeById ? [pokeById] : []
      )
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,

        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 20,
        }}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={pokemonFiltered}
          ListHeaderComponent={
            <Text
              style={{
                ...stylesApp.title,
                ...stylesApp.globalMargin,
                marginTop: top + 65,
                paddingBottom: 10,
              }}>
              {term}
            </Text>
          }
          keyExtractor={poke => poke.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
