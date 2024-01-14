import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {CategoryProps} from '../interface';
import {useState} from 'react';

export function useCategoryDataHelper() {
  const MY_USER_ID = auth().currentUser?.uid;
  const CATEGORIES_COLLECTION = firestore().collection('categories');

  const [isLoading, setIsLoading] = useState(false);

  const loadCategoriesData = (onDataLoaded: Function) => {
    setIsLoading(true);
    return CATEGORIES_COLLECTION.orderBy('createdAt', 'desc')
      .where('userId', '==', MY_USER_ID)
      .onSnapshot(
        snap => {
          const categoriesData: CategoryProps[] = [];
          if (snap && !snap.empty) {
            snap?.forEach(doc => {
              categoriesData.push({
                id: doc.id,
                name: doc.get('name'),
                bgColor: doc.get('bgColor'),
                icon: doc.get('icon'),
              });
            });
          }
          onDataLoaded(categoriesData);
          setIsLoading(false);
        },
        error => {
          console.log('loadCategoriesData Error', error);
        },
      );
  };

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

  const updateCategory = async (props: CategoryProps) => {
    const {id, name, icon, bgColor} = props;
    if (id) {
      return CATEGORIES_COLLECTION.doc(id).update({
        name,
        icon,
        bgColor,
      });
    }
  };

  const deleteCategory = async (categoryId: string) => {
    if (categoryId) {
      return CATEGORIES_COLLECTION.doc(categoryId).delete();
    }
  };

  return {
    isLoading,
    addNewCategory,
    loadCategoriesData,
    updateCategory,
    deleteCategory,
  };
}
