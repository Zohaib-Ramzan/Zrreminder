import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {PropsWithChildren} from 'react';
import { responsiveFontSize,responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';

type TextInputProps = PropsWithChildren<{
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  backgroundColor?: string;
  textColor?: string;
  value?: string;
  onChangeText?: any
  styleField?: any
  width?: any
  multiline?: boolean
}>;

const TextInputComp = ({
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  backgroundColor,
  textColor,
  value,
  onChangeText,
  styleField,
  width,
  multiline,
}: TextInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      multiline={multiline}
      onChangeText={onChangeText}
      style={[styleField,
        styles.textinputStyle,
        {backgroundColor: backgroundColor, color: textColor, width: width || responsiveWidth(85)},
      ]}
    />
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  textinputStyle: {
    borderWidth: responsiveWidth(0.1),
    borderRadius: 10,
    marginTop:responsiveHeight(3),
    backgroundColor: '#464657',
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: responsiveWidth(5),
  },
});
