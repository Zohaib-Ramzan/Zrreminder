import {Text, Pressable, StyleSheet, ActivityIndicator} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../constants';

type ButtonProps = PropsWithChildren<{
  text?: string;
  BtnWidth?: any;
  BtnHeight?: any;
  Btnmargin?: number;
  onPress?: any;
  isLoading?: boolean;
}>;

const ButtonComp = ({
  text,
  BtnWidth,
  BtnHeight,
  Btnmargin,
  onPress,
  isLoading,
}: // isLoading,
ButtonProps) => {
  const containerCondition = {
    margin: Btnmargin || responsiveHeight(4),
    width: BtnWidth || responsiveWidth(30),
    height: BtnHeight || responsiveHeight(7),
  };
  return (
    <Pressable
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[styles.containerView, containerCondition]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.textColor} />
      ) : (
        <Text style={styles.txtStyle}>{text}</Text>
      )}
    </Pressable>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.buttonColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStyle: {
    fontWeight: 'bold',
    color: COLORS.buttonTextColor,
    fontSize: responsiveFontSize(1.75),
  },
});
