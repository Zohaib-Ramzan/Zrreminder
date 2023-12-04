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
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({navigation}: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(isUserCreated);
      console.warn('Successfully Signup!');

      const userCredential = await firestore()
        .collection('cardCollection')
        .doc(isUserCreated.user.uid)
        .set({name: name, email: email, id: isUserCreated.user.uid});
      navigation.navigate('Login', {
        name: name,
      });
    } catch (error) {
      console.log(error);
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingScrollView>
            <View style={styles.imgContainer}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoStyle}
              />
            </View>
            <Text style={styles.txtColor}>Create your Account</Text>
            <View style={styles.textinputContainer}>
              <TextInputComp
                placeholder={'Name'}
                placeholderTextColor={'#b3b3b7'}
                backgroundColor={'#464657'}
                value={name}
                onChangeText={(value: string) => setName(value)}
                secureTextEntry={false}
                textColor="#fff"
              />
              <TextInputComp
                placeholder={'Email'}
                placeholderTextColor={'#b3b3b7'}
                backgroundColor={'#464657'}
                value={email}
                onChangeText={(value: string) => setEmail(value)}
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

              <TextInputComp
                placeholder={'Confirm Password'}
                placeholderTextColor={'#b3b3b7'}
                backgroundColor={'#464657'}
                value={confirmPassword}
                onChangeText={(value: string) => setConfirmPassword(value)}
                secureTextEntry={true}
                textColor="#fff"
              />

              {password !== confirmPassword && (
                <Text style={styles.passwordMatchText}>
                  Password does not match
                </Text>
              )}

              <ButtonComp text="Sign up" onPress={() => handleSignup()} />
              <View style={styles.alreadyAccountContainer}>
                <Text style={styles.alreadyAccountText}>
                  Already Have an Account?
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  style={styles.loginHyperlinkContainer}>
                  <Text style={styles.loginHyperlinkText}>Sign in</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingScrollView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Signup;

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
    marginBottom: responsiveHeight(1),
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
  passwordMatchText: {color: 'red'},
  alreadyAccountContainer: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    alignSelf: 'center',
  },
  alreadyAccountText: {color: '#b3b3b7', fontWeight: '800'},
  loginHyperlinkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
  },
  loginHyperlinkText: {
    color: '#54545e',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});
