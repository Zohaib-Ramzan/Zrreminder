import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import TextInputComp from '../components/TextInputComp';
import ButtonComp from '../components/ButtonComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {KeyboardScrollView} from '@rlemasquerier/react-native-keyboard-scrollview';
import {useToast} from 'react-native-toast-notifications';
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  // const {name} = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {show: showToast} = useToast();

  const handleLogin = async () => {
    // ... (existing code)
    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);
      try {
        const isUserValid = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log(isUserValid);

        await firestore()
          .collection('Users')
          .doc(isUserValid.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              // Document exists, access its data
              const data = doc.data();
              console.log('Document data:', data);
              // Move navigation logic here to ensure 'name' is set before navigating

              showToast('Successfully Login!');
              setIsLoading(false);

              navigation.dispatch(StackActions.replace('Main'));
              // navigation.navigate('Main', {
              //   Email: isUserValid.user.email,
              //   uid: isUserValid.user.uid,
              //   Name: data?.name, // Pass the retrieved name to the 'Home' screen
              // });
            } else {
              // Document doesn't exist
              showToast('Invalid User');
              // console.log('No such document!');
            }
          });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        showToast(error.message);
      }
    } else {
      Alert.alert('Please fill details!');
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
              placeholderTextColor={'#b3b3b7'}
              backgroundColor={'#464657'}
              value={email}
              onChangeText={(value: string) => setEmail(value)}
              secureTextEntry={false}
              textColor="#fff"
            />
            <TextInputComp
              placeholder={'Password'}
              placeholderTextColor={'#b3b3b7'}
              backgroundColor={'#464657'}
              value={password}
              onChangeText={(value: string) => setPassword(value)}
              secureTextEntry={true}
              textColor="#fff"
            />

            <ButtonComp
              text={'Sign in'}
              // onPress={() => loginVerification()}
              onPress={handleLogin}
              isLoading={isLoading}
            />

            {/* <Text style={styles.signupText}>- or sign up with -</Text>
            <View style={styles.signupButtonsContainer}>
              <View style={styles.signupGoogle}>
                <ButtonComp
                  BtnWidth={responsiveWidth(15)}
                  Btnmargin={responsiveWidth(0.1)}
                />
                <Image
                  source={require('../assets/images/google_logo.png')}
                  style={styles.googleImageContainer}
                />
              </View>
              <View style={styles.signupApple}>
                <ButtonComp
                  BtnWidth={responsiveWidth(15)}
                  Btnmargin={responsiveWidth(0.1)}
                />
                <Image
                  source={require('../assets/images/apple_logo.png')}
                  style={styles.appleImageContainer}
                />
              </View>
            </View> */}
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
  container: {
    flex: 1,
    backgroundColor: '#1a1a1c',
  },
  txtColor: {
    color: '#afafb0',
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
  signupGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupApple: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(2),
  },
  signupText: {
    color: '#b3b3b7',
    marginTop: responsiveHeight(4),
    textAlign: 'center',
    fontWeight: '700',
  },
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
    color: '#b3b3b7',
    fontWeight: '800',
  },
  signupNavigateHyperlink: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
  },
  signupNavigateHyperlinkText: {
    color: '#54545e',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  safeAreaViewStyle: {flex: 1},
});
