import React, {useState, useEffect} from 'react';
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
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import Card from '../components/Card';
import ColorPicker from 'react-native-wheel-color-picker';
import TextInputComp from '../components/TextInputComp';
const ImageData = [
  require('../assets/images/logo.png'),
  require('../assets/images/skin-care.png'),
  require('../assets/images/bottles.png'),
  require('../assets/images/cereals.png'),
  require('../assets/images/medicine.png'),
  require('../assets/images/detergent.png'),
];

const EditCategory = ({
  closeEditCategoryModal,
  crossButton,
  initialData,
  updateCardData,
  initialIndex,
}: any) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [currentColor, setCurrentColor] = useState('#464657');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [selectedCardData, setSelectedCardData] = useState<any>(null);

  const [mainDataIndex, setMainDataIndex] = useState(null);

  useEffect(() => {
    setMainDataIndex(initialIndex);
    console.log('selectedXardIndex' + initialIndex);
  }, [initialIndex]);

  // useEffect(() => {
  //   setSelectedCardIndex(initialIndex); // Update selectedCardIndex when the component receives a new initialIndex
  // }, [initialIndex]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCurrentColor(initialData.backgroundColor);
      setSelectedCardIndex(initialData.imgUrl - 1); // Assuming "index" is a property in initialData
      setSelectedCardData(initialData); // Set the whole initialData object
    }
  }, [initialData]);

  const onColorChange = (selectedColor: string) => {
    setCurrentColor(selectedColor);
  };

  const onCardSelect = (index: number) => {
    setSelectedCardIndex(index);
  };

  const onDonePress = () => {
    if (selectedCardData !== null && selectedCardIndex !== null) {
      const updatedData = {
        ...selectedCardData,
        title,
        imgUrl: ImageData[selectedCardIndex],
        backgroundColor: currentColor,
        isLongPressed: false, // Reset long press status
      };
      updateCardData(mainDataIndex, updatedData);
      console.log('Selet Ind:' + selectedCardIndex);
      closeEditCategoryModal(); // Close the edit modal
    } else {
      Alert.alert('Please Select Card!');
    }
  };

  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            <Text style={styles.titleTxt}>Edit Category</Text>
            <View style={styles.textInputContainer}>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  textColor="#fff"
                  placeholder="Add Title"
                  backgroundColor="#1a1a1c"
                  placeholderTextColor="#afafb0"
                  value={title}
                  onChangeText={setTitle}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.subText}>Select Icons</Text>
            <View style={styles.scrollviewContainer}>
              <ScrollView horizontal>
                <FlatList
                  numColumns={Math.ceil(ImageData.length / 2)}
                  data={ImageData}
                  renderItem={({item, index}) => {
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
                              isSelected ? currentColor : '#464657'
                            }
                            tintColor={'#fff'}
                            onPress={() => onCardSelect(index)}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </View>
            <Text style={styles.subText}>Colors</Text>
            <View style={{marginTop: responsiveHeight(2)}}>
              <ColorPicker onColorChange={onColorChange} swatchesOnly />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComp
                text="Done"
                BtnWidth={responsiveWidth(18)}
                onPress={() => onDonePress()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditCategory;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  container: {
    height: responsiveHeight(85),
    width: responsiveWidth(92),
    borderRadius: 10,
    backgroundColor: '#2c2c34',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  iconView: {
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(4),
  },
  iconStyle: {
    tintColor: '#afafb0',
    height: responsiveHeight(4),
    width: responsiveWidth(4),
  },
  titleTxt: {
    fontSize: responsiveFontSize(3.5),
    color: '#afafb0',
    marginLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: responsiveHeight(2),
  },
  subText: {
    fontSize: responsiveFontSize(2),
    color: '#afafb0',
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(6),
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
    marginTop: responsiveHeight(3),
  },
  selectedCardTouchable: {
    borderWidth: 2,
    borderColor: 'yellow', // You can set any highlight color here
    borderRadius: 12,
  },
  scrollViewContainer: {flexGrow: 1},
});
