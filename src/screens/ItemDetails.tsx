import {View, Text, StyleSheet, TouchableOpacity,Modal} from 'react-native';
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

const ItemDetails = ({navigation,route}: any) => {
    const { updatedData } = route.params;
    const crossButton = () => {
        setIsVisible(false)
      }

      const onPressEdit = () => {
        setIsVisible(false);
        navigation.navigate("ListPage", { isEditPressed: true , updatedData: updatedData });
      }
    
    const onPressDelete = () => {
        navigation.navigate("ListPage")
    }

    const { title, imgUrl, startDate, endDate, reminderTxt, noteTxt } = updatedData;
    const [isVisible, setIsVisible] = useState<boolean>(false)
  return (
    <View style={styles.container}>
        <Modal transparent visible={isVisible}>
            <AddItem crossButton={crossButton} />
        </Modal>
      <HeaderComp onPress={() => navigation.goBack()} />
      <View>
        <Text style={styles.txtStyle}>Item Details</Text>
      </View>
      <View style={styles.detailCardContainerView}>
        <View style={styles.detailCardContainer}>
          <View style={{alignItems: 'center', bottom: responsiveHeight(8)}}>
            <Card height={responsiveHeight(25)} width={responsiveWidth(50)} imageUrl={{uri: imgUrl}} ImgHeight={responsiveHeight(25)} ImgWidth={responsiveWidth(50)} opacity={1} backgroundColor='#fff'/>
           
          </View>
          <View style={styles.titleTxtContainer}>
          <Text style={styles.titleTxtStyle}>{title}</Text>
          </View>

          <View style={{flexDirection: "row",justifyContent: "space-around"}}>
            <Text style={styles.calenderTxt}>Start{"\n"}</Text>
            <View style={{position: "absolute",bottom: responsiveHeight(0.1),left: responsiveWidth(12)}}>
            <Text style ={[styles.calenderTxt,{fontFamily: "AlegreyaSans-MediumItalic",fontSize: responsiveFontSize(2)}]}>{startDate}</Text>
            </View>
            <Text style={styles.calenderTxt}>Expires{"\n"}</Text>
            <View style={{position: "absolute",bottom: responsiveHeight(0.1),right: responsiveWidth(14)}}>
            <Text style ={[styles.calenderTxt,{fontFamily: "AlegreyaSans-MediumItalic",fontSize: responsiveFontSize(2)}]}>{endDate}</Text>
            </View>
          </View>

          <View style={{alignItems: "center",marginTop: responsiveHeight(3)}}>
          <FontIcon name="bell" size={responsiveHeight(3)} color="#adadb0" />
          <View style={{marginTop: responsiveHeight(1)}}>
          <Text style={[styles.calenderTxt,{fontWeight: "600"}]}>Reminder:   {reminderTxt}</Text>
          </View>
          </View>

          <View style={{alignItems: "center",marginTop: responsiveHeight(2)}}>
            <Text style={[styles.calenderTxt,{fontWeight: "bold"}]}>
                Note
            </Text>
            <Text style={[styles.calenderTxt,{fontSize: responsiveFontSize(2),fontWeight:"600"}]}>{noteTxt}</Text>
          </View>
          
          <View style={styles.iconsContainer}>
              <TouchableOpacity style={{marginLeft: responsiveWidth(25)}} onPress={onPressDelete}>
                <Icon
                  name={'delete'}
                  size={responsiveHeight(4)}
                  color={'#aa5945'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: responsiveWidth(25)}} onPress={onPressEdit}>
                <Icon
                  name={'edit'}
                  size={responsiveHeight(4)}
                  color={'#9dbead'}
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
    backgroundColor: '#1a1a1c',
  },
  txtStyle: {
    color: '#fff',
    fontSize: responsiveFontSize(3.5),
  },
  detailCardContainerView: {
    marginTop: responsiveHeight(11),
    alignItems: 'center',
  },
  detailCardContainer: {
    height: responsiveHeight(65),
    width: responsiveWidth(90),
    backgroundColor: '#2c2c34',
    borderRadius: 10,
  },
  iconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: responsiveHeight(1),
    alignItems: "center"
  },
  titleTxtContainer: {
    bottom: responsiveHeight(6),
    alignItems: 'center'
  },
  titleTxtStyle: {
    color: "#adadb0",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  calenderTxt: {
    color: "#adadb0",
    fontFamily: "AlegreyaSans-MediumItalic",
    fontSize: responsiveFontSize(1.9)
  }
});
