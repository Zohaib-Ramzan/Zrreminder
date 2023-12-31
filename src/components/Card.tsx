import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  onLongPress?: () => void;
  isLongPressed?: boolean;
  cardTextColor?: string;
  onPressDelete?: () => void;
  onPressEdit?: () => void;
  opacity?: number
  itemCat?: any;
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
  cardStyles,
  onLongPress,
  isLongPressed,
  cardTextColor,
  onPressDelete,
  onPressEdit,
  opacity,
  itemCat = text,
}: CardProps) => {

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        cardStyles,
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
              tintColor: tintColor,
              opacity: opacity || 0.4,
            },
          ]}
        />
      )}
       <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.cardText,{color:cardTextColor,maxWidth:'80%'}]}>{text}</Text>
       
       
      {isLongPressed && (
        console.log(itemCat),
        <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onPressDelete}>
          <Icon name={'delete'} size={responsiveHeight(5)} color={'#aa5945'} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: responsiveWidth(5)}} onPress={onPressEdit}>
          <Icon name={'edit'} size={responsiveHeight(5)} color={'#9dbead'} />
        </TouchableOpacity>
      </View>
      )}
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
    fontSize: responsiveFontSize(2.8),
    position: 'absolute',
    fontFamily: 'AlegreyaSans-ExtraBoldItalic',
  },
  iconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: responsiveHeight(1),
  },
});
