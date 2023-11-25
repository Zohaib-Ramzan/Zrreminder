import { ImageSourcePropType } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface CardData {
    id?: string;
    index?: number;
    cardIndex:number;
    backgroundColor: string;
    imgUrl?: ImageSourcePropType;
    onPress?: any;
    title?: string;
    isLongPressed: boolean;
    itemCat?: any;
  }
