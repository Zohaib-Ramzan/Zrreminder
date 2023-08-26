import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import TextInputComp from '../components/TextInputComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import ModalCard from '../components/ModalCard';
import Card from '../components/Card';
import ColorPicker from 'react-native-wheel-color-picker';

const ImageData = [
  require('../assets/images/logo.png'),
  require('../assets/images/skin-care.png'),
  require('../assets/images/bottles.png'),
  require('../assets/images/cereals.png'),
  require('../assets/images/medicine.png'),
  require('../assets/images/detergent.png'),
];

const AddCategory = ({closeAddCategoryModal,crossButton}: any) => {
  const [addTitle , setAddTitle] = useState<string>("");
  const [currentColor, setCurrentColor] = useState('#464657');
  const [selectedCardIndex, setSelectedCardIndex] = useState<any>(null);    
  const [selectedCardData, setSelectedCardData] = useState<any>(null);

  const onColorChange = (selectedColor: string) => {
    return setCurrentColor(selectedColor);
  };


  const onCardSelect = (index: number, imgUrl: any) => {
    setSelectedCardIndex(index);
    setSelectedCardData(cardProps(imgUrl));
    
  };


  const onDonePress = () => {
    if (selectedCardData !== null) {
      // You can navigate to the other screen here and pass the selectedCardData
      // and other relevant props to the target screen.
      selectedCardData.title = addTitle;
      selectedCardData.backgroundColor = currentColor;
      closeAddCategoryModal(selectedCardData);
      crossButton();
    } else {
      // Handle case where no card is selected.
      Alert.alert("Please Select Card!")
    }
  };
  const cardProps = ( imgUrl: any ) => {
    return { imgUrl };
  }

  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            <Text style={styles.titleTxt}>Add Category</Text>
            <View style={styles.textInputContainer}>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  textColor="#fff"
                  placeholder="Add Title"
                  backgroundColor="#1a1a1c"
                  placeholderTextColor="#afafb0"
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
                  renderItem={({item, index}) => {
                    const isSelected = index === selectedCardIndex;
                    return (
                      <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity
                          style={[
                            isSelected && styles.selectedCardTouchable,
                          ]}
                          >
                          <Card
                            height={responsiveHeight(9)}
                            width={responsiveWidth(19)}
                            imageUrl={item}
                            ImgHeight={responsiveHeight(7)}
                            ImgWidth={responsiveWidth(18)}
                            backgroundColor={isSelected ? currentColor : '#464657'}
                            tintColor={'#fff'}
                            onPress={() => onCardSelect(index,item)}
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
                onPress={onDonePress}
              />
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
    borderRadius: 12
  },
});
