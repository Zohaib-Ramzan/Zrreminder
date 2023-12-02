import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
  SafeAreaView
} from 'react-native';
import React , {useState} from 'react';
import TextInputComp from '../components/TextInputComp';
import ButtonComp from '../components/ButtonComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({navigation}: SignupProps) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("")
  const [message,setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(email,password);
      console.log(isUserCreated)
      console.warn("Successfully Signup!")

      const userCredential = await firestore().collection('cardCollection').doc(isUserCreated.user.uid).set({name: name,email:email,id:isUserCreated.user.uid})
      navigation.navigate("Login",{
        name: name
      })
    } catch (error) {
      console.log(error)
      console.warn(error)
    }
  }

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

              {password !== confirmPassword && 
              <Text style={{color: "red"}}>Password does not match</Text>
              }

              <ButtonComp text="Sign up" onPress={() => handleSignup()} />

              <Text
                style={{
                  color: '#b3b3b7',
                  marginTop: responsiveHeight(4),
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                - or sign up with -
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: responsiveHeight(4),
                  alignContent: 'center',
                }}>
                <View style={styles.signupGoogle}>
                  <ButtonComp
                    BtnWidth={responsiveWidth(15)}
                    Btnmargin={responsiveWidth(0.1)}
                  />
                  <Image
                    source={require('../assets/images/google_logo.png')}
                    style={{
                      resizeMode: 'contain',
                      height: responsiveHeight(8),
                      width: responsiveWidth(9),
                      position: 'absolute',
                    }}
                  />
                </View>
                <View style={styles.signupApple}>
                  <ButtonComp
                    BtnWidth={responsiveWidth(15)}
                    Btnmargin={responsiveWidth(0.1)}
                  />
                  <Image
                    source={require('../assets/images/apple_logo.png')}
                    style={{
                      resizeMode: 'contain',
                      height: responsiveHeight(8),
                      width: responsiveWidth(8),
                      position: 'absolute',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: responsiveHeight(6.5),
                  alignSelf: 'center',
                }}>
                <Text style={{color: '#b3b3b7', fontWeight: '800'}}>
                  Already Have an Account?
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: responsiveWidth(1),
                  }}>
                  <Text
                    style={{
                      color: '#54545e',
                      textDecorationLine: 'underline',
                      fontWeight: '700',
                    }}>
                    Sign in
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
});
