import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {FadeInImage} from '../components/FadeInImage';
import {RootStackParams} from '../navigator/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePokemon from '../hooks/usePokemon';
import PokemonDetail from '../components/PokemonDetail';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}


const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;

  const {top} =  useSafeAreaInsets()

  const {isLoading, pokemon} = usePokemon(simplePokemon.id)

  // console.log(pokemon);

  return (
    <View style={{flex: 1}} >
      {/* Header */}
      <View
        style={{
          ...styles.header,
          backgroundColor: color,
        }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{...styles.button, top: top+10}}
            onPress={()=>navigation.pop()}
          >
            <Icon
              name="arrow-back-outline"
              color='white'
              size={30}
            />
          </TouchableOpacity>
        <Text style={{...styles.name, top: top+50}}>{simplePokemon.name + '\n#' + simplePokemon.id}</Text>
        <View style={{...styles.pokebolaWrap}}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={simplePokemon.picture} style={styles.image} />
      </View>
      {/* Body */}
      <View style={styles.body}>
        { isLoading ?
          <ActivityIndicator color={color} size={50} style={{marginTop: 320}} />
          :
          <PokemonDetail
            pokemon={pokemon}
          />
        }

      </View>
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  header: {
    position:'absolute',
    width: '100%',
    zIndex: 999,
    // backgroundColor: 'red',
    height: 320,
    alignItems: 'flex-start',
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
  },
  name: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20
  },
  pokebolaWrap: {
    width: 250,
    height: 250,
    position: 'absolute',
    left: 60,
    bottom: 5,
    opacity: 0.7,
    overflow: 'hidden',
    borderRadius: 10,
    // zIndex: 9999
  },
  pokebola: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 260,
    height: 260,
    position: 'absolute',
    left: 40,
    bottom: -20,
  },
  button: {
    position: 'absolute',
    left: 20,
  },
  body: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'

  }
});

