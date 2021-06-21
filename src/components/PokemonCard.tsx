import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useRef} from 'react';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({pokemon}: Props) => {

  const navigation = useNavigation();
  const [bkgColor, setBkgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    
    const asyncColor = async () => {
      const colors: any = await ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
      });

      isMounted.current && colors.platform === 'android'
        ? setBkgColor(colors.dominant || 'grey')
        : setBkgColor(colors.background || 'grey');
    };

    asyncColor();
    //IOS: bkg
    //Android: dominanr

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=> navigation.navigate('PokemonScreen', {
      simplePokemon: pokemon,
      color: bkgColor,
    })}
    >
      <View
        style={{
          ...styles.cardWrap,
          width: windowWidth * 0.45,
          backgroundColor: bkgColor,
        }}>
        <Text style={styles.name}>{pokemon.name + '\n#' + pokemon.id}</Text>
        <View style={{...styles.pokebolaWrap}}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardWrap: {
    marginHorizontal: 10,
    backgroundColor: 'red',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebolaWrap: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: -0,
    right: -0,
    opacity: 0.5,
    overflow: 'hidden',
    borderRadius: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
  },
  image: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
