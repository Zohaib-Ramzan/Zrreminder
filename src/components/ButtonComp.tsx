import { StyleSheet, Text, View, Pressable } from 'react-native'
import React,{PropsWithChildren} from 'react'
import { responsiveFontSize,responsiveHeight,responsiveWidth } from "react-native-responsive-dimensions"


type ButtonProps = PropsWithChildren <{
    text?: string;
    BtnWidth?: any;
    BtnHeight?: any
    Btnmargin?: number;
    onPress?: any;
}>

const ButtonComp = ({text,BtnWidth,BtnHeight,Btnmargin,onPress}: ButtonProps) => {
  return (
    <Pressable
    style={{
      backgroundColor: '#d6d6d6',
      margin: Btnmargin || responsiveHeight(4),
      width: BtnWidth || responsiveWidth(30),
      height: BtnHeight || responsiveHeight(7),
      borderRadius: 10,
      alignItems:"center",
      justifyContent: "center"
    }}
    onPress={onPress}
    >
    <Text
      style={{
        fontWeight: "bold",
        color: '#727273',
      }}>
      {text}
    </Text>
  </Pressable>
  )
}

export default ButtonComp
