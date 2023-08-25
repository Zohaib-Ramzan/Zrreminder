import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

type CardProps = PropsWithChildren<{
  text?: string;
  backgroundColor?: string;
  imageUrl?: ImageSourcePropType;
  onPress?: any;
  height?: any;
  width?: any;
  ImgHeight?: any;
  ImgWidth?: any;
  tintColor?: any;
  cardStyles?: any;
}>;

const Card = ({
  text,
  backgroundColor,
  imageUrl,
  onPress,
  height,
  width,
  ImgHeight,
  ImgWidth,
  tintColor,
  cardStyles
}: CardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[cardStyles,
        styles.cardContainer,
        {
          backgroundColor: backgroundColor || '#d6d6d6',
          height: height || responsiveHeight(18),
          width: width || responsiveWidth(42),
        },
      ]}>
      {imageUrl && (
        <Image
          source={imageUrl}
          style={[
            styles.imgStyle,
            {
              height: ImgHeight || responsiveHeight(38),
              width: ImgWidth || responsiveWidth(38),
              tintColor: tintColor 
            },
          ]}
        />
      )}
      <Text style={styles.cardText}>{text}</Text>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgStyle: {
    resizeMode: 'contain',
    opacity: 0.4,
  },
  cardText: {
    color: '#202020',
    fontSize: responsiveFontSize(2.8),
    position: 'absolute',
    fontFamily: "AlegreyaSans-ExtraBoldItalic"
  },
});
