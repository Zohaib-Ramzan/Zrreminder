import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  FlatList,
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

type dataArrayType = {
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
  const [currentDocId , SetCurrentDocId] = useState('');
  const [itemCat, setItemCat] = useState(route.params?.selectedCardTitle);
  const [dataArray, setDataArray] = useState<Array<dataArrayType>>([]);
  const { userData, updateCardCategoryTitle } = useContext(UserDataContext);
  const crossButton = () => {
    setModalVisible(false);
    setIsEditPress(false);
  };

  const handleCardCategoryPress = (itemCat: string) => {
    updateCardCategoryTitle(itemCat);
    // Navigate to AddItem screen or perform any other action
  };

  const handlePlusCirclePressed = () => {
    handleCardCategoryPress(itemCat)
    setModalVisible(true)
  }
 

  useEffect(() => {
    if (route.params?.newUpdatedData) {
      setDataArray(prevDataArray => [
        ...prevDataArray,
        {
          title: route.params?.newUpdatedData.title,
          imgUrl: route.params?.newUpdatedData.imgUrl,
          startDate: route.params?.newUpdatedData.startDate,
          endDate: route.params?.newUpdatedData.endDate,
          reminderTxt: route.params?.newUpdatedData.reminderTxt,
          noteTxt: route.params?.newUpdatedData.noteTxt,
          selectedCardCategory:
            route.params?.newUpdatedData.selectedCardCategory,
        },
      ]);
    }
  }, [route.params?.newUpdatedData]);

  useEffect(() => {
    if (route.params?.isEditPressed) {
      setModalVisible(true);
      setIsEditPress(true);
      SetCurrentDocId(route.params?.docId)
      setUpdatedData(route.params?.updatedData);
    } else {
      // Reset the state when not in edit mode
      setModalVisible(false);
      setIsEditPress(false);
      setUpdatedData(null);
    }
  }, [route.params]);
  // console.log("upd data "+route.params?.newUpdatedData)
  // console.log("isReminderCardVisible "+route.params?.selectedCardTitle)

  console.log("UpdatedData currentDocId: " + currentDocId)
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
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => {
              const selectedCardItm = item.selectedCardCategory;
              return (
                <View style={{ marginBottom: responsiveHeight(5) }}>
                  {route.params?.isReminderCardVisible && (
                    <ReminderCard updatedData={item} />
                  )}
                  {console.log(' item Cat = ' + selectedCardItm)}
                </View>
              );
            }}
            ListFooterComponent={
              <Pressable
                style={styles.imgContainer}
                onPress={() => handlePlusCirclePressed()}>
                <Image
                  source={require('../assets/images/plus-circle.png')}
                  style={styles.imgStyle}
                />
              </Pressable>
            }
          />
          {/* <Pressable
            style={styles.imgContainer}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/images/plus-circle.png')}
              style={styles.imgStyle}
            />
          </Pressable> */}
          {/* { route.params?.isReminderCardVisible &&
         <ReminderCard updatedData={route.params?.newUpdatedData} />
        } */}
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
    // position: 'absolute',
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
