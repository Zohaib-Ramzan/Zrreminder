import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  BackHandler,
  ActivityIndicator,
  // BackHandler,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Card from '../components/Card';
import AddCategory from './AddCategory';
import { CardData } from './types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppNavigator';
import { UserDataContext } from '../context';
import { useFirebaseAuth } from '../hooks';
import { COLORS } from '../constants/AppTheme';


const ImageData = [
  require('../assets/images/logo.png'),
  require('../assets/images/skin-care.png'),
  require('../assets/images/bottles.png'),
  require('../assets/images/cereals.png'),
  require('../assets/images/medicine.png'),
  require('../assets/images/detergent.png'),
];

// Define the type for the navigation prop
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const Home = ({ navigation }: HomeProps) => {

  const [closeCategoryModal, setCloseCategoryModal] = useState(false);
  const [closeEditCategoryModal, setCloseEditCategoryModal] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<CardData | null>(
    null,
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [longPressModal, setLongPressModal] = useState(false);
  const [loading , setLoading] = useState(true);
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
      cardIndex: plusCircleImg(),
    },
  ]);

  const { loadUserData } = useFirebaseAuth();
  const { userData, setUserData }: any = useContext(UserDataContext);

  useEffect(() => {
    const subscribe = loadUserData(setUserData);
    return () => subscribe?.();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchCardsFromDB = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('cardCollection')
          .orderBy('createdAt', 'desc')
          .get();
        const data = querySnapshot.docs.map(doc => ({
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
            cardIndex: plusCircleImg(),
          },
        ];

        setFetchedCardData(updatedData);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCardsFromDB();
  }, []);

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
      await firestore().collection('cardCollection').doc(docId).delete();
      // update the cardslist on homescreen
      const updatedCardDataList = [...fetchedCardData];
      updatedCardDataList.splice(index, 1);
      setFetchedCardData(updatedCardDataList);
    } catch (error) {
      console.error('Error Deleting Card:', error);
    }
  };

  const saveAddCategoryModal = () => {
    return setCloseCategoryModal(false);
  };

  const editCard = (item: CardData, index: number) => {
    setSelectedCardData({
      ...item,
      id: item.id,
    });
    setSelectedCardIndex(index);
    setCloseCategoryModal(true);
  };
  const gotoListPage = (item: CardData) => {
    return navigation.navigate('ListPage', {
      selectedCardTitle: item.title,
      id: item.id
    });
    
  };

  const updateCardData = (selectedCardIndex: number, updatedData: CardData) => {
    setFetchedCardData(prevDataArray => {
      const updatedCardDataArray = [...prevDataArray];
      
      if (updatedData.id) {
        // Updating an existing card
        const indexToUpdate = updatedCardDataArray.findIndex(card => card.id === updatedData.id);
        if (indexToUpdate !== -1) {
          updatedCardDataArray[indexToUpdate] = updatedData;
        }
      } else {
        // Adding a new card
        updatedCardDataArray.unshift(updatedData);
      }
      
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
    setFetchedCardData(prevDataArray => {
      const updatedData = [...prevDataArray];
      
      // Find the index of the plus button card
      const plusIndex = updatedData.findIndex(card => card.imgUrl === plusCircleImg());
      
      if (plusIndex !== -1 && !selectedData.id) {
        // Replacing the plus button card with the new card
        updatedData[plusIndex] = selectedData;
      } else {
        // Adding a new card to the beginning of the array
        updatedData.unshift(selectedData);
      }
      
      return updatedData;
    });
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
      <View style={styles.hometxtView}>
        <Text style={styles.txtStyle}>
          {`${userData?.name}'s Personal Categories`}
        </Text>
      </View>
      {fetchedCardData.length > 0 && (
        <View>
          {loading ? <ActivityIndicator size={'large'} color={COLORS.white}/> : 
          <FlatList
            style={{ height: responsiveHeight(68), bottom: responsiveHeight(3) }}
            numColumns={2}
            data={fetchedCardData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const onPress = () => {
                if (item.imgUrl === plusCircleImg()) {
                  item.onPress(); // Execute the plusCircleImg() onPress function
                } else {
                  gotoListPage(item); // Pass the index to gotoListPage function
                }
              };
              return (
                <TouchableWithoutFeedback onPress={toggleModal}>
                  <Card
                    backgroundColor={
                      item.imgUrl === plusCircleImg()
                        ? COLORS.addCardColor
                        : item.isLongPressed === true
                          ? COLORS.cardLongPressColor
                          : item.backgroundColor
                    }
                    onPress={onPress}
                    onLongPress={() => handleCardLongPress(index)}
                    text={item.title}
                    cardTextColor={item.isLongPressed ? COLORS.cardLongPressTextColor : COLORS.cardTextColor}
                    imageUrl={
                      ImageData[item.cardIndex]
                        ? ImageData[item.cardIndex]
                        : item.imgUrl
                    }
                    ImgHeight={responsiveHeight(15)}
                    ImgWidth={
                      item.imgUrl === plusCircleImg()
                        ? responsiveWidth(13)
                        : responsiveWidth(40)
                    }
                    cardStyles={[
                      styles.cardStyles,
                      { opacity: item.isLongPressed ? 1 : null },
                    ]}
                    isLongPressed={item.isLongPressed}
                    onPressDelete={() => deleteCard(index)}
                    onPressEdit={() => editCard(item, index)}>
                    {/* Children components if required */}
                  </Card>
                </TouchableWithoutFeedback>
              );
            }}
          />
        }
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  txtStyle: {
    fontSize: responsiveFontSize(5),
    color: COLORS.textColor,
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
  cardStyles: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(4),
  },
});
