import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const DeleteCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Card backgroundColor="#fff" />
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Icon name={'delete'} size={30} color={'#aa5945'} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: responsiveWidth(5)}}>
          <Icon name={'edit'} size={30} color={'#9dbead'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: responsiveHeight(40),
  },
});
