import { ImageSourcePropType } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface CardData {
    backgroundColor: string;
    imgUrl?: ImageSourcePropType;
    onPress?: any;
    title?: string;
    isLongPressed: boolean
  }