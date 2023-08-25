import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = "home";
          } else if (route.name === 'Settings') {
            iconName = "settings";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={40} color={"#d6d6d6"} />;
        },
        tabBarStyle: {
            backgroundColor:"#000",
            alignItems:"center"
        },
        headerShown:false,
        tabBarLabel: () => null
    })}

    >
        <Tab.Screen
        name='Home'
        component={Home}
        options={{headerShown:false}}
        />
        <Tab.Screen
        name='Settings'
        component={Settings}
        options={{headerShown:false}}
        />
    </Tab.Navigator>
  )
}

export default BottomNav
