// import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
// import BottomNav from './src/routes/BottomNav';
// import {NavigationContainer} from '@react-navigation/native';
import {ToastProvider} from 'react-native-toast-notifications';
import {NameProvider} from './src/global/AppContext';

const App = () => {
  return (
    <NameProvider>
      <ToastProvider>
        <AppNavigator />
      </ToastProvider>
    </NameProvider>
  );
};

export default App;
