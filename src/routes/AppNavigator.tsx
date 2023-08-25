import {Text, View} from 'react-native';
import React from 'react';
import App from '../../App';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Intro from '../screens/Intro';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import BottomNav from './BottomNav';

export type RootStackParamList = {
  Splash: any;
  Intro: any;
  Login: any;
  Signup: any;
  Main: any;
  Settings: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTintColor: '#d6d6d6',
            headerStyle: {backgroundColor: '#1a1a1c'},
          }}
        />
        <Stack.Screen
          name="Main"
          component={BottomNav}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
