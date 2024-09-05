import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import HeaderComp from '../components/HeaderComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppNavigator';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AddItem from './AddItem';
import ReminderCard from '../components/ReminderCard';
import { COLORS } from '../constants';
import { UserDataContext } from '../context/UserDataContext';
import { getDocs, collection, query, orderBy, limit, where } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

type dataArrayType = {
  id: string; // Added ID to distinguish items
  title: string;
  imgUrl: string;
  startDate: string;
  endDate: string;
  reminderTxt: string;
  noteTxt: string;
  selectedCardCategory?: string;
};

type ListPageProps = NativeStackScreenProps<RootStackParamList, 'ListPage'>;

const ListPage = ({ navigation, route }: ListPageProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditPress, setIsEditPress] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [currentDocId, setCurrentDocId] = useState('');
  const [itemCat, setItemCat] = useState(route.params?.selectedCardTitle || '');
  const [dataArray, setDataArray] = useState<Array<dataArrayType>>([]);
  const { userData, updateCardCategoryTitle } = useContext(UserDataContext);

  const crossButton = () => {
    setModalVisible(false);
    setIsEditPress(false);
  };

  const handleCardCategoryPress = (category: string) => {
    updateCardCategoryTitle(category);
    // Optionally navigate or perform other actions here
  };

  const handlePlusCirclePressed = () => {
    handleCardCategoryPress(itemCat);
    setModalVisible(true);
  };

  // Fetch items from Firestore based on selectedCardCategory
  const fetchItemsFromFirestore = async () => {
    try {
      const q = query(
        collection(firestore(), 'lists'),
        where('selectedCardCategory', '==', itemCat),
        orderBy('createdAt', 'desc'),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDataArray(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Fetch Firestore data on component mount and when itemCat changes
  useEffect(() => {
    if (itemCat) { // Ensure itemCat is not empty
      fetchItemsFromFirestore();
    }
  }, [itemCat]);

  // Handle new or updated data from navigation params
  useEffect(() => {
    if (route.params?.newUpdatedData) {
      const newItem = {
        id: route.params.newUpdatedData.docId,
        title: route.params.newUpdatedData.title,
        imgUrl: route.params.newUpdatedData.imgUrl,
        startDate: route.params.newUpdatedData.startDate,
        endDate: route.params.newUpdatedData.endDate,
        reminderTxt: route.params.newUpdatedData.reminderTxt,
        noteTxt: route.params.newUpdatedData.noteTxt,
        selectedCardCategory: route.params.newUpdatedData.selectedCardCategory,
      };
      // Option 1: Re-fetch data after adding/updating
      fetchItemsFromFirestore();

      // Option 2: Manually add if it matches current category
      /*
      if (newItem.selectedCardCategory === itemCat) {
        setDataArray(prevDataArray => [newItem, ...prevDataArray]);
      }
      */
    }
  }, [route.params?.newUpdatedData]);

  const onPressDelete = async (docId: string) => {
    try {
      await firestore().collection('lists').doc(docId).delete();
  
      // Update the local state to remove the deleted item
      setDataArray(prevDataArray => prevDataArray.filter(item => item.id !== docId));
  
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
      Alert.alert('Error', 'Failed to delete item. Please try again.');
    }
  };

  // Handle edit press
  useEffect(() => {
    if (route.params?.isEditPressed) {
      setModalVisible(true);
      setIsEditPress(true);
      setCurrentDocId(route.params?.docId || '');
      setUpdatedData(route.params?.updatedData || null);
    } else {
      setModalVisible(false);
      setIsEditPress(false);
      setUpdatedData(null);
    }
  }, [route.params]);

  // Debugging: Log fetched data
  useEffect(() => {
    if (dataArray.length > 0) {
      console.log("Firestore data:", dataArray.map(item => item.title));
    } else {
      console.log("Firestore data is empty.");
    }
  }, [dataArray]);

  console.log("UpdatedData currentDocId:", currentDocId);

  return (
    <SafeAreaView style={styles.containerView}>
      <View style={styles.viewContainer}>
        <HeaderComp onPress={() => navigation.goBack()} />
        <View>
          <Text style={styles.listText}>
            List:{'\n'}
            {itemCat}
          </Text>
        </View>
        <View style={styles.container}>
          <Modal visible={modalVisible} transparent>
            <AddItem
              currentDocId={route.params?.docId}
              crossButton={crossButton}
              isEditPress={isEditPress}
              updatedData={updatedData}
            />
          </Modal>

          <FlatList
            data={dataArray}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <View style={{ marginBottom: responsiveHeight(5) }}>
                  <ReminderCard onPressDelete={() => onPressDelete(item.id)} updatedData={item} />
              </View>
            )}
            ListFooterComponent={
              <Pressable
                style={styles.imgContainer}
                onPress={handlePlusCirclePressed}>
                <Image
                  source={require('../assets/images/plus-circle.png')}
                  style={styles.imgStyle}
                />
              </Pressable>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListPage;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStyle: {
    color: COLORS.textColor,
  },
  imgStyle: {
    height: responsiveHeight(15),
    width: responsiveWidth(15),
    resizeMode: 'contain',
    tintColor: COLORS.addIcontintColor
  },
  imgContainer: {
    marginTop: responsiveHeight(10),
    alignItems: 'center',
    bottom: responsiveHeight(2),
  },
  reminderCardTitleContainer: {
    marginTop: responsiveHeight(2),
  },
  calenderContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  calenderTxt: {
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
  flatListContent: {
    width: responsiveScreenWidth(100), // Set to 100% of screen width
    paddingHorizontal: responsiveWidth(5), // Optional padding
  },
  viewContainer: { flex: 1 },
  listText: {
    color: COLORS.textColor,
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    paddingHorizontal: responsiveWidth(4),
  },
});
