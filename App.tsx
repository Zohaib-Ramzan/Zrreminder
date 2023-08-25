import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/routes/AppNavigator'
import BottomNav from './src/routes/BottomNav'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <AppNavigator />
  )
}

export default App