import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import PokemonCard from '../components/PokemonCard';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import stylesApp from '../theme/appTheme';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();
  // console.log(simplePokemonList);

  return (
    <View style={{}}>
    {/* <View style={stylesApp.globalMargin}> */}
      <Image
        source={require('../assets/pokebola.png')}
        style={stylesApp.pokebolaBG}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          ListHeaderComponent={
            <Text style={{...stylesApp.title, ...stylesApp.globalMargin}}>Pokedex</Text>
          }
          keyExtractor={poke => poke.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={() => {
            loadPokemons();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
