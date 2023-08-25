import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
  } from 'react-native';
  import React, { useState } from 'react';
  import TextInputComp from '../components/TextInputComp';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import ButtonComp from '../components/ButtonComp';
  import ModalCard from '../components/ModalCard';
  
  const EditName = ({GoBackEditName,closeModal}: any) => {
      const [confirmVisible , setConfirmVisible] = useState(false);
     
      const dialogueOpen = () => {
        GoBackEditName();
      }
  
    return (
      <TouchableWithoutFeedback>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.containerView}>
            <View style={styles.container}>
             
  
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconView} onPress={() => closeModal()}>
                  <Image
                    source={require('../assets/images/cross.png')}
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.titleTxt}>Edit Name</Text>
              <View style={styles.textInputContainer}>
                <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                  <TextInputComp
                    textColor="#fff"
                    placeholder="New Name"
                    backgroundColor="#1a1a1c"
                    placeholderTextColor="#afafb0"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                  <TextInputComp
                    secureTextEntry={true}
                    textColor="#fff"
                    placeholder="Password"
                    backgroundColor="#1a1a1c"
                    placeholderTextColor="#afafb0"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <ButtonComp text="Done" BtnWidth={responsiveWidth(18)} onPress={dialogueOpen} />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  };
  
  export default EditName;
  
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
        flex: 1,
        alignItems: 'center',
        paddingTop: responsiveHeight(17),
        justifyContent:"flex-end"
    },
  });
  