import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {CategoryProps} from '../interface';

export function useCategoryDataHelper() {
  const MY_USER_ID = auth().currentUser?.uid;
  const CATEGORIES_COLLECTION = firestore().collection('categories');

  const addNewCategory = async (props: CategoryProps) => {
    const {name, icon, bgColor} = props;
    return CATEGORIES_COLLECTION.add({
      name,
      icon,
      bgColor,
      userId: MY_USER_ID,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  return {addNewCategory};
}
