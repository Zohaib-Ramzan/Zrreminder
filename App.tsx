// import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
// import BottomNav from './src/routes/BottomNav';
// import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <ToastProvider>
      <AppNavigator />
    </ToastProvider>
  );
};

export default App;
