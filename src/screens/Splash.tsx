import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';

type SplashoProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({navigation}: SplashoProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const routeName = Auth().currentUser?.uid ? 'Main' : 'Login';
      navigation.dispatch(StackActions.replace(routeName));
    }, 3000);

    return () => {
      clearTimeout(timer); // Clear timeout when unmounting
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logoImg}
      />
      <Text style={styles.taglineTxt}>Set Your Expiry Reminder</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1c',
  },
  logoImg: {
    height: 180,
    width: 180,
  },
  taglineTxt: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#f9f9f9',
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
  },
});
