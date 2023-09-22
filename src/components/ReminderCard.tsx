import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { create } from 'react-test-renderer'

import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import Icon from 'react-native-vector-icons/MaterialIcons';

const ReminderCard = () => {
  return (
    <View style={{marginLeft: responsiveWidth(18)}}>
    <TouchableOpacity style={styles.reminderCard}>
      <View style={styles.reminderCardTitleContainer}>
        <Text style={styles.reminderCardTitle}>
          Hello how are you doing
        </Text>
      </View>
      <View style={styles.calenderContainer}>
        <View>
          <Icon name="calendar-month" size={25} color="#464657" />
          <Text style={styles.calenderTxt}>Start</Text>
        </View>
        <View>
          <Icon name="calendar-month" size={25} color="#464657" />
          <Text style={styles.calenderTxt}>Expires</Text>
        </View>
      </View>
    </TouchableOpacity>
    <View style={{position: "absolute" ,top: responsiveHeight(7),right: responsiveWidth(58)}}>
      <View style={styles.productImgContainer}>
        
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    reminderCard: {
        height: responsiveHeight(30),
        width: responsiveWidth(70),
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
        marginBottom: responsiveHeight(8),
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
})

export default ReminderCard