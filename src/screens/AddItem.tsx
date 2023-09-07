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
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
const ImageData = [
  require('../assets/images/logo.png'),
  require('../assets/images/skin-care.png'),
  require('../assets/images/bottles.png'),
  require('../assets/images/cereals.png'),
  require('../assets/images/medicine.png'),
  require('../assets/images/detergent.png'),
];

const AddItem = ({
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
  const cardProps = (imgUrl: any) => {
    return {imgUrl};
  };

  return (
    <TouchableWithoutFeedback>
        <View style={styles.containerView}>
          <View style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            <Text style={styles.titleTxt}>Add Item</Text>
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
            <Text style={styles.subText}>Add Image</Text>
            <View style={styles.cardContainer}>
              <Card
                height={responsiveHeight(20)}
                width={responsiveWidth(36)}
                backgroundColor="#1a1a1c"
              />
              <TouchableOpacity style={styles.plusCircleContainer}>
                <Image
                  source={require('../assets/images/plus-circle.png')}
                  style={styles.imgContainer}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subText}>Set Date</Text>
            </View>
            <View style={styles.dateTextInputContainer}>
              <View>
                <TextInputComp placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Start Date' placeholderTextColor='#464657' backgroundColor='#1a1a1c' width={responsiveWidth(40)} styleField={{height:responsiveHeight(7),fontSize: responsiveFontSize(1.5),paddingRight: responsiveWidth(5)}} />
                <View style={{position: "absolute",bottom: responsiveHeight(1.5), marginLeft: responsiveWidth(2)}}>
                <Icon name="calendar-month" size={25} color="#464657" />
                </View>
              </View>
              <View style={{marginLeft:responsiveWidth(4)}}>
              <TextInputComp placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Expire Date' placeholderTextColor='#464657' backgroundColor='#1a1a1c' width={responsiveWidth(40)} styleField={{height:responsiveHeight(7),fontSize: responsiveFontSize(1.5),paddingRight: responsiveWidth(5)}} />
                <View style={{position: "absolute",bottom: responsiveHeight(1.5),marginLeft: responsiveWidth(2) }}>
                <Icon name="calendar-month" size={25} color="#464657" />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.subText}>Select Reminder</Text>
            </View>
            <View style={{alignItems: "center",height:responsiveHeight(8)}}>
                <TextInputComp placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Remainder' placeholderTextColor='#464657' backgroundColor='#1a1a1c' width={responsiveWidth(40)} styleField={{height:responsiveHeight(7),fontSize: responsiveFontSize(1.5),paddingRight: responsiveWidth(5)}} />
                <View style={{position: "absolute",bottom: responsiveHeight(0),left:responsiveWidth(28) }}>
                <FontIcon name="bell" size={20} color="#464657" />
                </View>
              </View>
              <View style={{alignItems: "center",marginTop:responsiveHeight(2)}}>
                <TextInputComp textColor='#fff' multiline={true} placeholder='&nbsp;&nbsp;Add Note' placeholderTextColor='#464657' backgroundColor='#1a1a1c' width={responsiveWidth(65)} styleField={{height:responsiveHeight(12),fontSize: responsiveFontSize(1.5),paddingRight: responsiveWidth(5)}} />
              </View>
            <View style={styles.buttonContainer}>
              <ButtonComp
                text="Done"
                BtnWidth={responsiveWidth(18)}
                onPress={() => onDonePress()}
              />
            </View>
      </ScrollView>
          </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
  },
  container: {
    height: responsiveHeight(90),
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
    marginTop: responsiveHeight(2),
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: responsiveHeight(0.5),
  },
  imageFlatListStyle: {
    height: responsiveHeight(10),
    width: responsiveWidth(10),
  },
  cardContainer: {
    alignItems: 'center',
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
  additemContainer: {},
  plusCircleContainer: {
    position: 'absolute',
  },
  imgContainer: {
    marginTop: responsiveHeight(6),
    resizeMode: 'contain',
    height: responsiveHeight(7),
  },
  dateTextInputContainer: {
    flexDirection: "row",
    marginLeft: responsiveWidth(5)
  }
});
