import React from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Intro from '../screens/Intro';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import BottomNav from './BottomNav';
import ListPage from '../screens/ListPage';
import ItemDetails from '../screens/ItemDetails';
import AddItem from '../screens/AddItem';

export type RootStackParamList = {
  Splash: any;
  Intro: any;
  Login: any;
  Signup: any;
  Home: any;
  Main: any;
  Settings: any;
  ListPage: any;
  ItemDetails: any;
  AddItem: any;
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
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ListPage"
          component={ListPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomNav}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
