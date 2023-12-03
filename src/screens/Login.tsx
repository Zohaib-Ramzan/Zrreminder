import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
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
import firestore from '@react-native-firebase/firestore';
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  // const {name} = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // ... (existing code)
    if (email.length > 0 && password.length > 0) {
      try {
        const isUserValid = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log(isUserValid);

        const getName = await firestore()
          .collection('cardCollection')
          .doc(isUserValid.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              // Document exists, access its data
              const data = doc.data();
              console.log('Document data:', data);

              // Move navigation logic here to ensure 'name' is set before navigating
              navigation.navigate('Home', {
                Email: isUserValid.user.email,
                uid: isUserValid.user.uid,
                Name: data?.name, // Pass the retrieved name to the 'Home' screen
              });
            } else {
              // Document doesn't exist
              console.log('No such document!');
            }
          });
      } catch (error) {
        console.warn(error);
      }
    } else {
      Alert.alert('Please fill details!');
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
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
                text="Sign in"
                // onPress={() => loginVerification()}
                onPress={() => handleLogin()}
              />

              <Text style={styles.signupText}>- or sign up with -</Text>
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
              </View>
              <View style={styles.signupNavigateContainer}>
                <Text style={styles.signupNavigateText}>
                  Don't have an Account?
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('Signup')}
                  style={styles.signupNavigateHyperlink}>
                  <Text style={styles.signupNavigateHyperlinkText}>
                    Sign up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
    marginBottom: responsiveHeight(3),
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
    margin: responsiveHeight(6.5),
    alignSelf: 'center',
  },
  signupNavigateText: {color: '#b3b3b7', fontWeight: '800'},
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
});
