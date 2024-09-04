
import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import {ToastProvider} from 'react-native-toast-notifications';
import {UserDataProvider} from './src/context';

const App = () => {
  return (
    <UserDataProvider>
      <ToastProvider>
        <AppNavigator />
      </ToastProvider>
    </UserDataProvider>
  );
};
export default App;
