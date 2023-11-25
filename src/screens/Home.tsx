import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'


import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Card from '../components/Card';
import AddCategory from './AddCategory';
import {CardData} from './types';
import EditCategory from './EditCategory';
import ListPage from './ListPage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppNavigator';


const ImageData = [
  require('../assets/images/logo.png'),
  require('../assets/images/skin-care.png'),
  require('../assets/images/bottles.png'),
  require('../assets/images/cereals.png'),
  require('../assets/images/medicine.png'),
  require('../assets/images/detergent.png'),
];

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


const Home = ({navigation}: HomeProps) => {
  const [closeCategoryModal, setCloseCategoryModal] = useState(false);
  const [closeEditCategoryModal, setCloseEditCategoryModal] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<CardData | null>(
    null,
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [longPressModal, setLongPressModal] = useState(false);
  const [isLongPress, setIsLongPress] = useState<boolean>(false);
  const plusCircleImg = () => {
    return require('../assets/images/plus-circle.png');
  };
  const [fetchedCardData, setFetchedCardData] = useState<CardData[]>([
    {
      backgroundColor: '#2c2c34',
      onPress: () => setCloseCategoryModal(true),
      imgUrl: plusCircleImg(),
      isLongPressed: false,
      cardIndex: plusCircleImg()
    },
  ]);


  useEffect(() => {
    const fetchCardsFromDB = async () => {
      try {
        const querySnapshot = await firestore().collection("cardCollection").get();
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CardData[];

        // Add the plus card to the fetched data
      const updatedData = [
        ...data,
        {
          backgroundColor: '#2c2c34',
          onPress: () => setCloseCategoryModal(true),
          imgUrl: plusCircleImg(),
          isLongPressed: false,
          cardIndex: plusCircleImg()
        },
      ];

        setFetchedCardData(updatedData);
        // console.log(fetchedCardData)
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCardsFromDB();
  }, []);

  // const [selectedCardDataArray, setSelectedCardDataArray] = useState<
  //   CardData[]
  // >([
  //   {
  //     backgroundColor: '#2c2c34',
  //     onPress: () => setCloseCategoryModal(true),
  //     imgUrl: plusCircleImg(),
  //     isLongPressed: false,
  //   },
  // ]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Reset the isLongPressed property of all cards to false
        const updatedCardDataArray = fetchedCardData.map(cardData => ({
          ...cardData,
          isLongPressed: false,
        }));

        setFetchedCardData(updatedCardDataArray);

        return true; // Prevent default behavior (closing the app)
      },
    );

    return () => {
      backHandler.remove(); // Remove the event listener when the component is unmounted
    };
  }, [fetchedCardData]);

  const handleCardLongPress = (index: number) => {
    if (fetchedCardData[index].imgUrl !== plusCircleImg()) {
      setFetchedCardData(prevDataArray => {
        const updatedArray = [...prevDataArray];
        updatedArray[index].isLongPressed = !updatedArray[index].isLongPressed;
        return updatedArray;
      });
    }
  };

  const deleteCard = async (index: number) => {
    // Delete Card
    try {

      const cardToDelete = fetchedCardData[index];
      const docId = cardToDelete.id;
      // delete selectedcard from Firestore
      await firestore().collection("cardCollection").doc(docId).delete();
      // update the cardslist on homescreen
      const updatedCardDataList = [...fetchedCardData];
      updatedCardDataList.splice(index, 1);
      setFetchedCardData(updatedCardDataList);
    }
    catch (error) {
      console.error("Error Deleting Card:",error)
    }
  };

  const saveAddCategoryModal = () => {
    return setCloseCategoryModal(false);
  }

  const editCard = (item: CardData, index:number) => {
    // Edit Card
    setSelectedCardData(item); // This line sets the selectedCardData
    setSelectedCardIndex(index);
    setCloseCategoryModal(true);
  
  };
// console.log("s c i "+selectedCardDataArray[0].title)
  const gotoListPage = (ind: number) => {
    return navigation.navigate("ListPage",{selectedCardTitle:fetchedCardData[ind].title});
  }

  const updateCardData = (selectedCardIndex: number, updatedData: CardData) => {
    setFetchedCardData(selectedCardDataArray => {
      const updatedCardDataArray = [...fetchedCardData];
      updatedCardDataArray[selectedCardIndex] = updatedData;
      console.log(updatedCardDataArray[selectedCardIndex].imgUrl+" index")
      return updatedCardDataArray;
    });
  };


  const toggleModal = () => {
    setLongPressModal(!longPressModal);
    setIsLongPress(!isLongPress);
  };

  const crossButton = () => {
    setCloseCategoryModal(false);
    setCloseEditCategoryModal(false);
    setSelectedCardData(null);
  };

  const closeModal = (selectedData: CardData) => {
    setFetchedCardData(prevDataArray => [selectedData, ...prevDataArray]);
  };

  return (
    <View style={styles.container}>
      <Modal transparent visible={closeCategoryModal}>
        <AddCategory
          crossButton={crossButton}
          closeAddCategoryModal={closeModal}
          initialData={selectedCardData}
          initialIndex={selectedCardIndex}
          updateCardData={updateCardData}
          saveAddCategoryModal={saveAddCategoryModal}
        />
      </Modal>
      {/* <Modal transparent visible={closeEditCategoryModal}>
        <EditCategory
          closeEditCategoryModal={saveEditCategoryModal} // Make sure this prop is correctly passed
          crossButton={crossButton}
          initialData={selectedCardData}
          initialIndex={selectedCardIndex}
          updateCardData={updateCardData}
        />
      </Modal> */}
      <View style={styles.hometxtView}>
        <Text style={styles.txtStyle}>Zohaib's Personal Categories</Text>
      </View>
      {fetchedCardData.length > 0 && (
        <View>
          <FlatList
            style={{height: responsiveHeight(68), bottom: responsiveHeight(3)}}
            numColumns={2}
            data={fetchedCardData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              const onPress = () => {
                if (item.imgUrl === plusCircleImg()) {
                  item.onPress(); // Execute the plusCircleImg() onPress function
                } else {
                  gotoListPage(index); // Pass the index to gotoListPage function
                }
              };
              return (
                <TouchableWithoutFeedback onPress={toggleModal}>
                  <Card
                    backgroundColor={
                      item.imgUrl === plusCircleImg()
                        ? '#2c2c34'
                        : item.isLongPressed == true
                        ? '#23232a'
                        : item.backgroundColor
                    }
                    onPress={onPress}
                    onLongPress={() => handleCardLongPress(index)}
                    text={item.title}
                    cardTextColor={item.isLongPressed ? '#B1B3B3' : '#202020'}
                    imageUrl={ImageData[item.cardIndex] ? ImageData[item.cardIndex] : item.imgUrl}
                    ImgHeight={responsiveHeight(15)}
                    ImgWidth={
                      item.imgUrl === plusCircleImg()
                        ? responsiveWidth(13)
                        : responsiveWidth(40)
                    }
                    cardStyles={{
                      marginLeft: responsiveWidth(5),
                      marginTop: responsiveHeight(4),
                      opacity: item.isLongPressed ? 1 : null,
                    }}
                    isLongPressed={item.isLongPressed}
                    onPressDelete={() => deleteCard(index)}
                    onPressEdit={() => editCard(item, index)}></Card>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1c',
  },
  txtStyle: {
    fontSize: responsiveFontSize(5),
    color: '#FBFFFF',
    marginLeft: responsiveWidth(2),
    marginBottom: responsiveWidth(8),
    fontFamily: 'AlegreyaSans-Medium',
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  secondCardContainer: {
    marginLeft: responsiveWidth(5),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: responsiveHeight(4),
    left: responsiveWidth(12),
  },
  hometxtView: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(2),
  },
});
