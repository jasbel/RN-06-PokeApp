import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import PokemonScreen from "../screens/PokemonScreen";
import SearchScreen from "../screens/SearchScreen";
import { RootStackParams } from "./Navigation";

const StackSearch = createStackNavigator<RootStackParams>();

export function NavTabSearch() {
  return (
    <StackSearch.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <StackSearch.Screen name="HomeScreen" component={SearchScreen} />
      <StackSearch.Screen name="PokemonScreen" component={PokemonScreen} />
    </StackSearch.Navigator>
  );
}

export default NavTabSearch;