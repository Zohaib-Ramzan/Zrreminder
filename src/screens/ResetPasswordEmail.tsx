import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Alert, Keyboard } from 'react-native'
import { COLORS, isEmptyString } from '../constants';
import TextInputComp from '../components/TextInputComp';
import ButtonComp from '../components/ButtonComp';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import auth, { firebase } from '@react-native-firebase/auth';
import { useFirebaseAuth, useToastHelper } from '../hooks';
import HeaderComp from '../components/HeaderComp';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordEmail = () => {
    const [email, setEmail] = useState('');

    const { showSuccessToast, showErrorToast, showNormalToast } = useToastHelper();
    const { userForgetPassword } = useFirebaseAuth();

    const forgotPassword = () => {
        console.log('email is: ' + email)
        if (isEmptyString(email)) {
            showNormalToast('Please enter email');
        } else {
            userForgetPassword(email)
                .then(() => {
                    dismissKeyboard();
                    clearTextInput();
                    showSuccessToast('Please check your email...');
                }).catch(error => {
                    showErrorToast(error.message);
                })
        }

    }

    // const userforgetPassword = (email: string) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await firebase.auth().sendPasswordResetEmail(email);
    //             resolve();
    //         } catch (error) {
    //             console.log(error);
    //             let errorMsg = 'Something went wrong. Please try again later';
    //             if (error.code === 'auth/invalid-email') {
    //                 errorMsg = 'Please enter a valid email address';
    //             } else if (error.code === 'auth/invalid-login') {
    //                 errorMsg = 'Invalid email or password';
    //             }
    //             reject(new Error(errorMsg));
    //         }
    //     });
    // };

    const clearTextInput = () => {
        setEmail(''); // Clear the text input value
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Dismiss the keyboard
    };

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyling}>
                <HeaderComp onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.textInputStyling}>
                <Text style={styles.paragraphStyling}>We'll send your password reset info to the email address linked your account. </Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.textColor}>Enter your email address:</Text>
                    <TextInputComp placeholder='E-mail' value={email} onChangeText={(value: string) => setEmail(value)} />
                </View>
                <View style={styles.buttonStyling}>
                    <ButtonComp BtnWidth={responsiveWidth(40)} text='Recover Password' onPress={() => forgotPassword()} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ResetPasswordEmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    textColor: {
        color: COLORS.textColor,
        fontWeight: '700',
        fontSize: responsiveFontSize(2)
    },
    textInputStyling: {
        flex: 1,
    },
    buttonStyling: {
        alignItems: 'center'
    },
    paragraphStyling: {
        color: COLORS.textColor,
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        marginBottom: responsiveWidth(5),
        fontWeight: '700'
    },
    headerStyling: {
        flex: 0.3,
        margin: responsiveWidth(1)
    },
    contentContainer: {
        alignSelf: 'center'
    }
})