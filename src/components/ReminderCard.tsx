import { View, Text,TouchableOpacity,StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'

import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import Icon from 'react-native-vector-icons/MaterialIcons';

const ReminderCard = ({updatedData,onPressDelete,onPressBell}: any) => {
  return (
    <View style={{marginLeft: responsiveWidth(18)}}>
    <Pressable style={styles.reminderCard}>
      <View style={styles.reminderCardTitleContainer}>
        <Text style={styles.reminderCardTitle}>
          {updatedData.title}
        </Text>
      </View>
      <View style={styles.calenderContainer}>
        <View style={{alignItems:"center"}}>
          <Icon name="calendar-month" size={25} color="#464657" />
          <Text style={styles.calenderTxt}>Start</Text>
          <Text style={styles.datesTxtStyle}>{updatedData.startDate}</Text>
        </View>
        <View style={{alignItems:"center"}}>
          <Icon name="calendar-month" size={25} color="#464657" />
          <Text style={styles.calenderTxt}>Expires</Text>
          <Text style={styles.datesTxtStyle}>{updatedData.endDate}</Text>
        </View>
      </View>
    </Pressable>
    <View style={styles.imgCardContainer}>
      <View style={styles.productImgContainer}>
        <Image source={{uri: updatedData.imgUrl}} style={styles.imgStyles}/>
        <Pressable onPress={onPressBell} style={styles.IconStylesContainer}>
          <Image source={require("../assets/images/bell.png")} style={styles.IconStyles} />
        </Pressable>
        <Pressable onPress={onPressDelete} style={[styles.IconStylesContainer,{top: responsiveHeight(13),marginLeft: responsiveWidth(24)}]}>
          <Image source={require("../assets/images/cancel.png")} style={[styles.IconStyles,{tintColor:undefined}]} />
        </Pressable>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    reminderCard: {
        height: responsiveHeight(30),
        width: responsiveWidth(68),
        backgroundColor: '#8ac185',
        borderRadius: 10,
      },
      reminderCardTitle: {
        fontSize: responsiveFontSize(2.8),
        fontFamily: 'AlegreyaSans-ExtraBoldItalic',
        color: '#344932',
        textAlign: 'center',
      },
      reminderCardTitleContainer: {
        marginTop: responsiveHeight(2),
      },
      calenderContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: responsiveHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      calenderTxt: {
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center',
      },
      productImgContainer: {
        height: responsiveHeight(18),
        width: responsiveWidth(34),
        backgroundColor: '#fff',
        borderRadius: 10,
      },
      datesTxtStyle: {
        fontFamily: "AlegreyaSans-MediumItalic",
        fontSize: responsiveFontSize(2)
      },
      IconStyles: {
        height:responsiveHeight(5),
        width: responsiveWidth(5),
        resizeMode:"contain",
        tintColor:"#8ac185"
      },
      IconStylesContainer: {
        position:"absolute",
        height:responsiveHeight(5),
        width:responsiveWidth(10),
        backgroundColor:"#313136",
        borderRadius:10,
        alignItems:"center"
      },
      imgCardContainer : {
        position: "absolute" ,
        top: responsiveHeight(6.5),
        right: responsiveWidth(58)
      },
      imgStyles: {
        height: responsiveHeight(18),
        width: responsiveWidth(34),
        borderRadius: 10,
        resizeMode:"contain"
      }
})

export default ReminderCard