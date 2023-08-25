import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {PropsWithChildren} from 'react';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';

 type ModalCardProps = PropsWithChildren <{
    height ?: any;
    width ?: any; 
    closeModal?: any;
    text ?: string;
 }>  
  
  const ModalCard = ({height , width , closeModal, text}: ModalCardProps) => {
    return (
      <TouchableWithoutFeedback>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.containerView}>
            <View style={[styles.container,{ height:height || responsiveHeight(85),
      width: width || responsiveWidth(92)}]}>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconView} onPress={closeModal}>
                  <Image
                    source={require('../assets/images/cross.png')}
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image source={require("../assets/images/verify.png")} style={styles.imgStyle} />
              </View>
              <View style={styles.txtWrapper}>
              <Text style={styles.titleTxt}>{text}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  };
  
  export default ModalCard;
  
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: responsiveHeight(5),
    },
    container: {
      borderRadius: 10,
      backgroundColor: '#464657',
    },
    iconContainer: {
      alignItems: 'flex-end',
    },
    iconView: {
      marginTop: responsiveHeight(2),
      marginRight: responsiveWidth(4),
    },
    iconStyle: {
      tintColor: '#e7e7e9',
      height: responsiveHeight(4),
      width: responsiveWidth(4),
    },
    titleTxt: {
      fontSize: responsiveFontSize(3.5),
      color: '#e7e7e9',
      textAlign: 'center',
      marginBottom: responsiveHeight(8),
    },
    txtWrapper: {
      flex: 1,
      justifyContent: "center"
    },
    imgStyle: {
      height: responsiveHeight(10),
      width: responsiveWidth(15),
      tintColor:"#8ac185"
    },
    imageContainer: {
      alignItems: "center"
    }
  });
  