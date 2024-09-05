import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import HeaderComp from '../components/HeaderComp';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import AddItem from './AddItem';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../constants';


const ItemDetails = ({ navigation, route }: any) => {
  const { updatedData, docId } = route.params;
  const crossButton = () => {
    setIsVisible(false);
  };

  const onPressEdit = () => {
    setIsVisible(false);
    navigation.navigate('ListPage', {
      isEditPressed: true,
      updatedData: updatedData,
      docId: docId
    });
  };

  const onPressDelete = async () => {
    try {
      await firestore().collection('lists').doc(docId).delete();
      console.log('Document successfully deleted!');
      navigation.navigate('ListPage');
    } catch (error) {
      console.error('Error deleting document:', error);
      Alert.alert('Error', 'Failed to delete item. Please try again.');
    }
  };

  // const setReminderCardVisible = () => {
  //   setIsRemindderVisible(true)
  //   navigation.goBack()
  // }
  console.log("DOC ID IS:" + docId)

  const goBackListPage = () => {
    navigation.navigate('ListPage', {
      newUpdatedData: updatedData,
    });
  };
  const { title, imgUrl, startDate, endDate, reminderTxt, noteTxt } = updatedData;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Modal transparent visible={isVisible}>
        <AddItem crossButton={crossButton} />
      </Modal>
      <HeaderComp onPress={goBackListPage} />
      <View>
        <Text style={styles.txtStyle}>Item Details</Text>
      </View>
      <View style={styles.detailCardContainerView}>
        <View style={styles.detailCardContainer}>
          <View style={styles.cardContainer}>
            <Card
              height={responsiveHeight(25)}
              width={responsiveWidth(50)}
              imageUrl={{ uri: imgUrl }}
              ImgHeight={responsiveHeight(25)}
              ImgWidth={responsiveWidth(50)}
              opacity={1}
              backgroundColor="#fff"
            />
          </View>
          <View style={styles.titleTxtContainer}>
            <Text style={styles.titleTxtStyle}>{title}</Text>
          </View>

          <View style={styles.calenderView}>
            <Text style={styles.calenderTxt}>Start{'\n'}</Text>
            <View style={styles.startDateView}>
              <Text
                style={[
                  styles.calenderTxt,
                  {
                    fontSize: responsiveFontSize(2),
                  },
                ]}>
                {startDate}
              </Text>
            </View>
            <Text style={styles.calenderTxt}>Expires{'\n'}</Text>
            <View style={styles.endDateView}>
              <Text
                style={[
                  styles.calenderTxt,
                  {
                    fontSize: responsiveFontSize(2),
                  },
                ]}>
                {endDate}
              </Text>
            </View>
          </View>

          <View style={styles.reminderTextView}>
            <FontIcon name="bell" size={responsiveHeight(3)} color={COLORS.bellIconTintColor} />
            <View style={{ marginTop: responsiveHeight(1) }}>
              <Text style={styles.calenderTxt}>Reminder: {reminderTxt}</Text>
            </View>
          </View>

          <View style={styles.noteTextView}>
            <Text style={[styles.calenderTxt, styles.boldFont]}>Note</Text>
            <Text
              style={[styles.calenderTxt, { fontSize: responsiveFontSize(2) }]}>
              {noteTxt}
            </Text>
          </View>

          <View style={styles.iconsContainer}>
            <TouchableOpacity
              style={{ marginLeft: responsiveWidth(25) }}
              onPress={onPressDelete}>
              <Icon
                name={'delete'}
                size={responsiveHeight(4)}
                color={COLORS.deleteIconTintColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: responsiveWidth(25) }}
              onPress={onPressEdit}>
              <Icon
                name={'edit'}
                size={responsiveHeight(4)}
                color={COLORS.editIconTintColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  txtStyle: {
    color: COLORS.textColor,
    fontSize: responsiveFontSize(3.5),
  },
  detailCardContainerView: {
    marginTop: responsiveHeight(11),
    alignItems: 'center',
  },
  detailCardContainer: {
    height: responsiveHeight(65),
    width: responsiveWidth(90),
    backgroundColor: COLORS.itemDetailsCardBG,
    borderRadius: 10,
  },
  iconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: responsiveHeight(1),
    alignItems: 'center',
  },
  titleTxtContainer: {
    bottom: responsiveHeight(6),
    alignItems: 'center',
  },
  titleTxtStyle: {
    color: COLORS.textColor,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  calenderTxt: {
    color: COLORS.textColor,
    fontFamily: 'AlegreyaSans-MediumItalic',
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
  },
  calenderView: { flexDirection: 'row', justifyContent: 'space-around' },
  cardContainer: { alignItems: 'center', bottom: responsiveHeight(8) },
  startDateView: {
    position: 'absolute',
    bottom: responsiveHeight(0.1),
    left: responsiveWidth(12),
  },
  endDateView: {
    position: 'absolute',
    bottom: responsiveHeight(0.1),
    right: responsiveWidth(14),
  },
  reminderTextView: { alignItems: 'center', marginTop: responsiveHeight(3) },
  noteTextView: { alignItems: 'center', marginTop: responsiveHeight(2) },
  boldFont: {
    fontWeight: 'bold',
  },
});
