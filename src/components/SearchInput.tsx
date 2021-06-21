import React from 'react';
import { TextInput, Platform, StyleProp, ViewStyle } from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { onChange } from 'react-native-reanimated';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>
}

const SearchInput = (props: Props) => {
  const {style, onDebounce} = props;

  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue(textValue, 1500);

  useEffect(() => {
    // console.log(debouncedValue);
    onDebounce(debouncedValue)
  }, [debouncedValue])

  return (
    <View >
      <View style={{...styles.textBackground, ...style as any}}>
        <TextInput
          placeholder='Buscar Pokemon'
          style={{...styles.textInput, top: Platform.OS==='ios'?0:2}}
          autoCapitalize='none'
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon
          name='search-outline'
          size={30}
        />
      </View>
      {/* <Text>{textValue}</Text> */}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  }
});
