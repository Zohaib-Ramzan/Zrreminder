import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppNavigator';
import { useFirebaseAuth } from '../hooks';
import { COLORS, resetAndGo } from '../constants';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({ navigation }: SplashProps) => {
  const { isUserLoggedIn } = useFirebaseAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const routeName = isUserLoggedIn() ? 'Main' : 'Login';
      resetAndGo(navigation, routeName);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    backgroundColor: COLORS.background,
  },
  logoImg: {
    height: 180,
    width: 180,
  },
  taglineTxt: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.splashTagLineTextColor,
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
  },
});
