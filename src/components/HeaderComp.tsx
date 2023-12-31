import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {PropsWithChildren} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

type HeaderProps = PropsWithChildren<{
  onPress?: any;
}>;

const HeaderComp = ({onPress}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Pressable onPress={onPress} style={styles.pressableArea}>
          <Icon name="arrow-back" size={25} color="#d6d6d6" />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(6),
    backgroundColor: '#1a1a1c',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    left: responsiveWidth(2),
  },
  pressableArea: {
    height: responsiveHeight(5),
    width: responsiveWidth(8),
  },
});
