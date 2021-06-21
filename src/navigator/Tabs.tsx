import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform} from 'react-native';
import colors from '../res/colors';
import NavTabList from './Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import NavTabSearch from './NavTabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        activeTintColor: colors.primary,
        labelStyle: {
          marginBottom: Platform.OS === 'android' ? 10 : 0,
        },
        style: {
          position: 'absolute',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS ==='ios' ? 70 : 60,
          backgroundColor: 'rgba(255,255,255,.85)',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={NavTabList}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen name="SearchScreen" component={NavTabSearch}
        options={{
          tabBarLabel: 'Busquedas',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
