import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import TextInputComp from '../components/TextInputComp';
import ButtonComp from '../components/ButtonComp';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppNavigator';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { KeyboardScrollView } from '@rlemasquerier/react-native-keyboard-scrollview';
import { COLORS, isEmptyString, resetAndGo } from '../constants';
import { useFirebaseAuth, useToastHelper } from '../hooks';
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { showSuccessToast, showErrorToast, showNormalToast } = useToastHelper();
  const { userLogin } = useFirebaseAuth();

  const handleLogin = async () => {
    if (isEmptyString(email) || isEmptyString(password)) {
      showNormalToast('Please enter email and password');
    } else {
      setIsLoading(true);
      userLogin(email, password)
        .then(() => {
          showSuccessToast("You're logged in!");
          resetAndGo(navigation, 'Main');
        })
        .catch(error => {
          showErrorToast(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewStyle}>
      <KeyboardScrollView>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoStyle}
            />
          </View>
          <Text style={styles.txtColor}>Sign in</Text>
          <View style={styles.textinputContainer}>
            <TextInputComp
              placeholder={'Email'}
              value={email}
              onChangeText={(value: string) => setEmail(value)}
              secureTextEntry={false}
            />
            <TextInputComp
              placeholder={'Password'}
              value={password}
              onChangeText={(value: string) => setPassword(value)}
              secureTextEntry={true}
            />

            <ButtonComp
              text={'Sign in'}
              // onPress={() => loginVerification()}
              onPress={handleLogin}
              isLoading={isLoading}
            />

            <View style={styles.signupNavigateContainer}>
              <Text style={styles.signupNavigateText}>
                Don't have an Account?
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Signup')}
                style={styles.signupNavigateHyperlink}>
                <Text style={styles.signupNavigateHyperlinkText}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  txtColor: {
    color: COLORS.textColor,
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(0.5),
  },
  logoStyle: {
    height: responsiveHeight(22),
    width: responsiveHeight(22),
    resizeMode: 'contain',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // signupGoogle: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // signupApple: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: responsiveWidth(2),
  // },
  // signupText: {
  //   color: '#b3b3b7',
  //   marginTop: responsiveHeight(4),
  //   textAlign: 'center',
  //   fontWeight: '700',
  // },
  signupButtonsContainer: {
    flexDirection: 'row',
    marginTop: responsiveHeight(4),
    alignContent: 'center',
  },
  googleImageContainer: {
    resizeMode: 'contain',
    height: responsiveHeight(8),
    width: responsiveWidth(9),
    position: 'absolute',
  },
  appleImageContainer: {
    resizeMode: 'contain',
    height: responsiveHeight(8),
    width: responsiveWidth(8),
    position: 'absolute',
  },
  signupNavigateContainer: {
    flexDirection: 'row',
    margin: responsiveHeight(15),
    alignSelf: 'center',
  },
  signupNavigateText: {
    color: COLORS.signupNavigateTextColor,
    fontWeight: '800',
  },
  signupNavigateHyperlink: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
  },
  signupNavigateHyperlinkText: {
    color: COLORS.signupNavigateHyperlinkTextColor,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});
