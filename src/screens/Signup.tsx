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
import firestore from '@react-native-firebase/firestore';
import {KeyboardScrollView} from '@rlemasquerier/react-native-keyboard-scrollview';
import {useToast} from 'react-native-toast-notifications';
import {COLORS} from '../constants';
type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({navigation}: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {show: showToast} = useToast();

  const handleSignup = async () => {
    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);
      try {
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        await auth().signOut();
        console.log(isUserCreated);
        setIsLoading(false);
        showToast('Successfully Signup!');

        await firestore()
          .collection('Users')
          .doc(isUserCreated.user.uid)
          .set({name: name, email: email, id: isUserCreated.user.uid});
        navigation.navigate('Login', {
          name: name,
        });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        showToast(error.message);
      }
    } else {
      Alert.alert('Please fill details!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoStyle}
        />
      </View>
      <Text style={styles.txtColor}>Create your Account</Text>
      <KeyboardScrollView>
        <View style={styles.textinputContainer}>
          <TextInputComp
            placeholder={'Name'}
            value={name}
            onChangeText={(value: string) => setName(value)}
            secureTextEntry={false}
          />
          <TextInputComp
            placeholder={'Email'}
            value={email}
            onChangeText={(value: string) => setEmail(value)}
          />

          <TextInputComp
            placeholder={'Password'}
            value={password}
            onChangeText={(value: string) => setPassword(value)}
            secureTextEntry={true}
          />

          <TextInputComp
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChangeText={(value: string) => setConfirmPassword(value)}
            secureTextEntry={true}
          />

          {password !== confirmPassword && (
            <Text style={styles.passwordMatchText}>
              Password does not match
            </Text>
          )}

          <ButtonComp
            text="Sign up"
            isLoading={isLoading}
            onPress={() => handleSignup()}
          />
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
      </KeyboardScrollView>
    </SafeAreaView>
  );
};
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  txtColor: {
    color: COLORS.textColor,
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
