import {Text, Pressable, StyleSheet} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

type ButtonProps = PropsWithChildren<{
  text?: string;
  BtnWidth?: any;
  BtnHeight?: any;
  Btnmargin?: number;
  onPress?: any;
  isLoading?: any;
}>;

const ButtonComp = ({
  text,
  BtnWidth,
  BtnHeight,
  Btnmargin,
  onPress,
}: // isLoading,
ButtonProps) => {
  const containerCondition = {
    margin: Btnmargin || responsiveHeight(4),
    width: BtnWidth || responsiveWidth(30),
    height: BtnHeight || responsiveHeight(7),
  };
  return (
    <Pressable
      style={[styles.containerView, containerCondition]}
      onPress={onPress}>
      <Text style={styles.txtStyle}>{text}</Text>
    </Pressable>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#d6d6d6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStyle: {
    fontWeight: 'bold',
    color: '#727273',
  },
});
