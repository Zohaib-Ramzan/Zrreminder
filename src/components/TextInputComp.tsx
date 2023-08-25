import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {PropsWithChildren} from 'react';
import { responsiveFontSize,responsiveHeight,responsiveWidth } from "react-native-responsive-dimensions"

type TextInputProps = PropsWithChildren<{
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  backgroundColor?: string;
  textColor?: string;
  value?: string;
  onChangeText?: any
}>;

const TextInputComp = ({
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  backgroundColor,
  textColor,
  value,
  onChangeText
}: TextInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      style={[
        styles.textinputStyle,
        {backgroundColor: backgroundColor, color: textColor},
      ]}
    />
  );
};
{console}
export default TextInputComp;

const styles = StyleSheet.create({
  textinputStyle: {
    borderWidth: responsiveWidth(0.1),
    width: responsiveWidth(85),
    borderRadius: 10,
    marginTop: responsiveHeight(3),
    backgroundColor: '#464657',
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: responsiveWidth(5),
  },
});
