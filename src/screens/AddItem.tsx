import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import Card from '../components/Card';
import TextInputComp from '../components/TextInputComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AddReminderPage from './AddReminderPage';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import {RouteProp} from '@react-navigation/native';

type AddItemProps = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

type RouteParam = {
  AddItem: {
    selectedCardTitle: string;
    // Add other properties if needed
  };
};

const AddItem = ({crossButton, updatedData, isEditPress}: any) => {
  const route = useRoute<RouteProp<RouteParam, 'AddItem'>>();
  const navigation = useNavigation<AddItemProps>();
  const [title, setTitle] = useState('');
  const [selectedCardData, setSelectedCardData] = useState<any>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Add Start Date');
  const [isStartingDateSelected, setIsStartingDateSelected] = useState(false);
  const [expireDate, setExpireDate] = useState('Add Expire Date');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [imageSelect, setImageSelect] = useState<any>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [reminderText, setReminderText] = useState('Add Reminder');
  const [noteText, setNoteText] = useState('');
  const [selectedCardCategory, setSelectedCardCategory] = useState(
    route.params?.selectedCardTitle,
  );

  console.log(route.params?.selectedCardTitle);

  const imagePicker = () => {
    let options = {
      mediaType: 'photo',
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        // Check if the user didn't cancel the image picker
        const selectedImageUri = response.assets[0].uri;
        setImageSelect(selectedImageUri);
        setIsImageSelected(true);
      } else {
        Alert.alert('Image not Selected!');
      }
    });
  };

  useEffect(() => {
    if (isEditPress) {
      // Create a copy of updatedData and update its imgUrl property// Now this should log the updated value
      setImageSelect(updatedData.imgUrl);
      setTitle(updatedData.title);
      setSelectedDate(updatedData.startDate);
      setExpireDate(updatedData.endDate);
      setReminderText(updatedData.reminderTxt);
      setNoteText(updatedData.noteTxt);
    }
  }, [isEditPress]);

  const openReminderModal = () => {
    setIsReminderModalOpen(true);
  };

  const closeReminderModal = () => {
    setIsReminderModalOpen(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    // console.warn('A date has been picked: ', date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const newDt = x[0].split('-');
    if (isStartingDateSelected === true) {
      setSelectedDate(newDt[2] + '/' + newDt[1] + '/' + newDt[0]);
    } else {
      setExpireDate(newDt[2] + '/' + newDt[1] + '/' + newDt[0]);
    }
    setIsStartingDateSelected(false);
    hideDatePicker();
  };

  // useEffect(() => {
  //   setSelectedCardIndex(initialIndex); // Update selectedCardIndex when the component receives a new initialIndex
  // }, [initialIndex]);

  const onPressDateSelected = (value: boolean) => {
    showDatePicker();
    setIsStartingDateSelected(value);
  };

  const gotoItemDetailsPage = (dataToUpdate: any) => {
    crossButton();
    navigation.navigate('ItemDetails', {
      updatedData: dataToUpdate,
    });
  };

  const onDonePress = () => {
    if (title !== '' && imageSelect !== null) {
      console.log(
        title +
          ' ' +
          imageSelect +
          ' ' +
          selectedDate +
          ' ' +
          expireDate +
          ' ' +
          reminderText +
          ' ' +
          noteText +
          ' ' +
          selectedCardCategory,
      );
      const updatedData = {
        ...selectedCardData,
        title: title,
        imgUrl: imageSelect,
        startDate: selectedDate,
        endDate: expireDate,
        reminderTxt: reminderText,
        noteTxt: noteText,
        selectedCardCategory: selectedCardCategory,
      };
      crossButton();
      gotoItemDetailsPage(updatedData);
    } else {
      Alert.alert('Please Select All Fields!');
      // gotoItemDetailsPage()
    }
  };

  const plusCircleStyles = isImageSelected
    ? {
        right: responsiveWidth(15),
        bottom: responsiveHeight(1),
      }
    : {};

  return (
    <TouchableWithoutFeedback>
      <View style={styles.containerView}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainerView}>
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
            <Text style={styles.titleTxt}>
              {isEditPress === true ? 'Edit Item' : 'Add Item'}
            </Text>
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
            <Text style={styles.subText}>
              {isEditPress === true ? 'Edit Item' : 'Add Item'}
            </Text>
            <View style={styles.cardContainer}>
              <Card
                height={responsiveHeight(20)}
                width={responsiveWidth(36)}
                backgroundColor="#1a1a1c"
                imageUrl={imageSelect && {uri: imageSelect}}
                ImgHeight={responsiveHeight(20)}
                ImgWidth={responsiveWidth(36)}
              />
              <TouchableOpacity
                style={[styles.plusCircleContainer, plusCircleStyles]}
                onPress={imagePicker}>
                {isImageSelected && (
                  <View style={styles.imageBoxContainer}> </View>
                )}
                <Image
                  source={require('../assets/images/plus-circle.png')}
                  style={[
                    styles.imgContainer,
                    {
                      height:
                        isImageSelected === true
                          ? responsiveHeight(4)
                          : responsiveHeight(7),
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subText}>Set Date</Text>
            </View>
            <View style={styles.dateBoxContainer}>
              <Pressable
                style={styles.calendarBox}
                onPress={() => onPressDateSelected(true)}>
                <Text style={styles.caledarBoxTxtStyle}>{selectedDate}</Text>
                <View style={styles.calendarView}>
                  <Icon name="calendar-month" size={25} color="#464657" />
                </View>
              </Pressable>
              <View style={{marginLeft: responsiveWidth(4)}}>
                <Pressable
                  style={styles.calendarBox}
                  onPress={() => onPressDateSelected(false)}>
                  <Text style={styles.caledarBoxTxtStyle}>{expireDate}</Text>
                  <View style={styles.calendarView}>
                    <Icon name="calendar-month" size={25} color="#464657" />
                  </View>
                </Pressable>
              </View>
            </View>
            <Modal transparent visible={isReminderModalOpen}>
              <View style={styles.addReminderView}>
                <AddReminderPage
                  crossButton={closeReminderModal}
                  onValueSelected={(value: string) => {
                    console.log(value);
                    setReminderText(value);
                  }}
                />
              </View>
            </Modal>
            <View style={{marginBottom: responsiveHeight(1)}}>
              <Text style={styles.subText}>Select Reminder</Text>
            </View>
            <View style={styles.addReminderContainer}>
              <Pressable
                style={[
                  styles.calendarBox,
                  {
                    width:
                      isEditPress === true || reminderText.length > 12
                        ? responsiveWidth(55)
                        : responsiveWidth(40),
                  },
                ]}
                onPress={openReminderModal}>
                <Text style={styles.caledarBoxTxtStyle}>{reminderText}</Text>
                <View style={styles.calendarView}>
                  <FontIcon name="bell" size={20} color="#464657" />
                </View>
              </Pressable>
            </View>
            <View style={styles.addNoteView}>
              <TextInputComp
                textColor="#fff"
                multiline={true}
                placeholder="&nbsp;&nbsp;Add Note"
                placeholderTextColor="#464657"
                backgroundColor="#1a1a1c"
                width={responsiveWidth(65)}
                value={noteText}
                onChangeText={setNoteText}
                styleField={{
                  height: responsiveHeight(12),
                  fontSize: responsiveFontSize(1.5),
                  paddingRight: responsiveWidth(5),
                }}
              />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <View style={styles.buttonContainer}>
              <ButtonComp
                text={isEditPress === true ? 'Update' : 'Done'}
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
    // right: responsiveWidth(15),
    // bottom: responsiveHeight(1)
  },
  imgContainer: {
    marginTop: responsiveHeight(6),
    resizeMode: 'contain',
    height: responsiveHeight(7),
  },
  dateBoxContainer: {
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
    marginLeft: responsiveWidth(5),
  },
  calendarBox: {
    width: responsiveWidth(40),
    height: responsiveHeight(7),
    backgroundColor: '#1a1a1c',
    borderRadius: 10,
  },
  caledarBoxTxtStyle: {
    color: '#464657',
    fontSize: 12,
    textAlign: 'center',
    paddingTop: responsiveHeight(2),
    marginLeft: responsiveWidth(4),
    fontWeight: 'bold',
  },
  contentContainerView: {flexGrow: 1},
  imageBoxContainer: {
    backgroundColor: '#2c2c34',
    height: responsiveHeight(6),
    width: responsiveWidth(11),
    borderRadius: 8,
    position: 'absolute',
    top: responsiveHeight(5),
    right: responsiveWidth(12),
  },
  calendarView: {
    position: 'absolute',
    bottom: responsiveHeight(1.5),
    marginLeft: responsiveWidth(2),
  },
  addReminderView: {flex: 1},
  addReminderContainer: {alignItems: 'center', height: responsiveHeight(5)},
  addNoteView: {alignItems: 'center', marginTop: responsiveHeight(2)},
});
