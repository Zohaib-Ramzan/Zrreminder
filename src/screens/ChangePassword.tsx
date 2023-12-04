import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import TextInputComp from '../components/TextInputComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';

const ChangePassword = ({GoBackPasswordChange, closePasswordModal}: any) => {
  // it will close the ChangePassword Modal  and open Password Change Modal
  const dialogueOpen = () => {
    GoBackPasswordChange();
  };

  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        <View style={styles.containerView}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => closePasswordModal()}>
                <Image
                  source={require('../assets/images/cross.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleTxt}>Change Password</Text>
            <View style={styles.textInputContainer}>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  textColor="#fff"
                  placeholder="Email"
                  backgroundColor="#1a1a1c"
                  placeholderTextColor="#afafb0"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  secureTextEntry={true}
                  textColor="#fff"
                  placeholder="Current Password"
                  backgroundColor="#1a1a1c"
                  placeholderTextColor="#afafb0"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  secureTextEntry={true}
                  textColor="#fff"
                  placeholder="New Password"
                  backgroundColor="#1a1a1c"
                  placeholderTextColor="#afafb0"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComp
                text="Done"
                BtnWidth={responsiveWidth(18)}
                onPress={dialogueOpen}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  container: {
    height: responsiveHeight(85),
    width: responsiveWidth(92),
    borderRadius: 10,
    backgroundColor: '#2c2c34',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  iconView: {
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(4),
  },
  iconStyle: {
    tintColor: '#afafb0',
    height: responsiveHeight(4),
    width: responsiveWidth(4),
  },
  titleTxt: {
    fontSize: responsiveFontSize(3.5),
    color: '#afafb0',
    textAlign: 'center',
    marginBottom: responsiveHeight(8),
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: responsiveHeight(17),
  },
  scrollviewContainer: {flexGrow: 1},
});
