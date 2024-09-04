import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import TextInputComp from '../components/TextInputComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import Card from '../components/Card';
import CustomColorPicker from '../components/customColorPicker';
import { COLORS } from '../constants';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import firestore from '@react-native-firebase/firestore';

const ImageData = [
  require('../assets/images/logo.png'),
  require('../assets/images/skin-care.png'),
  require('../assets/images/bottles.png'),
  require('../assets/images/cereals.png'),
  require('../assets/images/medicine.png'),
  require('../assets/images/detergent.png'),
];

const AddCategory = ({
  closeAddCategoryModal,
  crossButton,
  initialData,
  initialIndex,
  updateCardData,
  saveAddCategoryModal,
}: any) => {
  const [addTitle, setAddTitle] = useState<string>('');
  const [currentColor, setCurrentColor] = useState('#464657');
  const [selectedImagePath, setSelectedImagePath] = useState<string>('');
  const [selectedCardIndex, setSelectedCardIndex] = useState<any>(null);
  const [selectedCardData, setSelectedCardData] = useState<any>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>('Add Category');
  const [buttonTxt, setButtonTxt] = useState<string>('Done');
  const [mainDataIndex, setMainDataIndex] = useState(null);
  const {getUserId} = useFirebaseAuth();

  const userId = getUserId();

  useEffect(() => {
    setMainDataIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (initialData) {
      setAddTitle(initialData.title);
      setCurrentColor(initialData.backgroundColor);
      setSelectedCardIndex(initialData.imgUrl - 1); // Assuming "index" is a property in initialData
      setSelectedCardData(initialData); // Set the whole initialData object

      // Update category title and button text based on initialData
      initialData === null
        ? setCategoryTitle('Add Category')
        : setCategoryTitle('Edit Category');
      initialData === null ? setButtonTxt('Done') : setButtonTxt('Update');
    }
  }, [initialData]);

  const onColorChange = (selectedColor: string) => {
    return setCurrentColor(selectedColor);
  };

  const onCardSelect = (index: number, imgUrl: any) => {
    setSelectedCardIndex(index);
    setSelectedCardData(cardProps(imgUrl));
    setSelectedImagePath(ImageData[index]); // Set the selected image path
  };

  const createCardDB = async () => {
    try {
      const docRef = await firestore().collection('cardCollection').add({
        userid: userId,
        title: addTitle,
        imgUrl: ImageData[selectedCardIndex],
        backgroundColor: currentColor,
        createdAt: new Date(),
        isLongPressed: false,
      });
  
      return docRef.id;
    } catch (error) {
      console.error('Error creating new card:', error);
      return null;
    }
  };

  const onDonePress = async () => {
    if (initialData == null) {
      // Adding a new card
      if (selectedCardIndex !== null) {
        const newDocId = await createCardDB();
  
        if (newDocId) {
          closeAddCategoryModal({
            id: newDocId,
            title: addTitle,
            imgUrl: ImageData[selectedCardIndex],
            backgroundColor: currentColor,
            isLongPressed: false,
          });
          crossButton();
        } else {
          Alert.alert('Error', 'Failed to create new card');
        }
      } else {
        Alert.alert('Please Select Card!');
      }
    } else {
      // Editing an existing card
      if (selectedCardData !== null && selectedCardIndex !== null) {
        try {
          const docRef = firestore().collection('cardCollection').doc(initialData.id);
          
          await docRef.update({
            title: addTitle,
            imgUrl: ImageData[selectedCardIndex],
            backgroundColor: currentColor,
            isLongPressed: false,
          });
          
          updateCardData(mainDataIndex, {
            id: initialData.id,
            title: addTitle,
            imgUrl: ImageData[selectedCardIndex],
            backgroundColor: currentColor,
            isLongPressed: false,
          });
          
          crossButton();
          saveAddCategoryModal();
          
        } catch (error: any) {
          console.error('Error updating document:', error.message);
          Alert.alert('Error', 'Failed to update category');
        }
      } else {
        Alert.alert('Please Select Card!');
      }
    }
  };
  
  
  
  
  const cardProps = (imgUrl: any) => {
    return { imgUrl };
  };

  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={styles.contentContainerView}>
        <View style={styles.containerView}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => crossButton()}>
                <Image
                  source={require('../assets/images/cross.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleTxt}>{categoryTitle}</Text>
            <View style={styles.textInputContainer}>
              <TouchableOpacity style={{ marginBottom: responsiveHeight(0.1) }}>
                <TextInputComp
                  textColor={COLORS.white}
                  placeholder="Add Title"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  value={addTitle}
                  onChangeText={setAddTitle}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.subText}>Select Icons</Text>
            <View style={styles.scrollviewContainer}>
              <ScrollView horizontal>
                <FlatList
                  numColumns={Math.ceil(ImageData.length / 2)}
                  data={ImageData}
                  renderItem={({ item, index }) => {
                    const isSelected = index === selectedCardIndex;
                    return (
                      <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity
                          style={[isSelected && styles.selectedCardTouchable]}>
                          <Card
                            height={responsiveHeight(9)}
                            width={responsiveWidth(19)}
                            imageUrl={item}
                            ImgHeight={responsiveHeight(7)}
                            ImgWidth={responsiveWidth(18)}
                            backgroundColor={
                              isSelected ? currentColor : COLORS.defaultCardBG
                            }
                            tintColor={COLORS.white}
                            onPress={() => onCardSelect(index, item)}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </View>
            <View>
              <Text style={styles.subText}>Colors</Text>
              <View>
                <CustomColorPicker onColorChange={onColorChange} />
              </View>
              <View style={styles.buttonContainer}>
                <ButtonComp
                  text={buttonTxt}
                  BtnWidth={responsiveWidth(18)}
                  onPress={onDonePress}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(8),
  },
  container: {
    height: responsiveHeight(85),
    width: responsiveWidth(92),
    borderRadius: 10,
    backgroundColor: COLORS.addCategoryCardBG,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  iconView: {
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(4),
  },
  iconStyle: {
    tintColor: COLORS.white,
    height: responsiveHeight(4),
    width: responsiveWidth(4),
  },
  titleTxt: {
    fontSize: responsiveFontSize(3.5),
    color: COLORS.textColor,
    marginLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  subText: {
    fontSize: responsiveFontSize(2),
    color: COLORS.textColor,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(2),
    fontWeight: 'bold',
  },
  imageFlatListStyle: {
    height: responsiveHeight(10),
    width: responsiveWidth(10),
  },
  cardContainer: {
    marginRight: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
  },
  scrollviewContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
  },
  selectedCardTouchable: {
    borderWidth: 2,
    borderColor: COLORS.selectedCardBorderColor, // You can set any highlight color here
    borderRadius: 12,
  },
  contentContainerView: { flexGrow: 1 },
});
