import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS } from '../constants';

const DeleteCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Card backgroundColor={COLORS.white} />
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Icon name={'delete'} size={30} color={COLORS.deleteIconTintColor} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: responsiveWidth(5) }}>
          <Icon name={'edit'} size={30} color={COLORS.editIconTintColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
