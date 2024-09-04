import React, {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CardProps = PropsWithChildren<{
  text?: string;
  backgroundColor?: string;
  imageUrl?: ImageSourcePropType;
  onPress?: () => void;
  height?: number;
  width?: number;
  ImgHeight?: number;
  ImgWidth?: number;
  tintColor?: string;
  cardStyles?: any;
  onLongPress?: () => void;
  isLongPressed?: boolean;
  cardTextColor?: string;
  onPressDelete?: () => void;
  onPressEdit?: () => void;
  opacity?: number;
  itemCat?: string;
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
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedText = truncateText(text || '', 60);

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
      <View style={styles.textContainer}>
        <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.cardText,{color:cardTextColor,maxWidth:'80%'}]}>
          {truncatedText}
        </Text>
      </View>
      
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
  textContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'AlegreyaSans-ExtraBoldItalic',
  },
  iconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: responsiveHeight(1),
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
  },
});
