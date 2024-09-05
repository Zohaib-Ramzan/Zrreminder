import React, { useState, useEffect, useContext } from 'react';
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
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { COLORS } from '../constants';
import firestore from '@react-native-firebase/firestore';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { UserDataContext } from '../context/UserDataContext';


type AddItemProps = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

type RouteParam = {
  AddItem: {
    selectedCardTitle: string;
    // Add other properties if needed
  };
};

const AddItem = ({ crossButton, updatedData, isEditPress,currentDocId }: any) => {
  const route = useRoute<RouteProp<RouteParam, 'AddItem'>>();
  const navigation = useNavigation<AddItemProps>();
  const [title, setTitle] = useState('');
  const [selectedCardData, setSelectedCardData] = useState<any>(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isExpireDatePickerVisible, setExpireDatePickerVisibility] =
    useState(false);
  const [prevSelectedDate, setPrevSelectedDate] = useState(new Date());
  const [prevExpireDate, setPrevExpireDate] = useState(new Date());
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Add Start Date');
  const [isStartingDateSelected, setIsStartingDateSelected] = useState(false);
  const [expireDate, setExpireDate] = useState('Add Expire Date');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [imageSelect, setImageSelect] = useState<any>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [reminderText, setReminderText] = useState('Add Reminder');
  const [noteText, setNoteText] = useState('');
  const [selectedCardCategory, setSelectedCardCategory] = useState(''); // fix this '' in database by locally store it
  const {getUserId} = useFirebaseAuth();
  const { userData } = useContext(UserDataContext);

  // const selectedCardCategory = route.params?.selectedCardTitle;
  

  console.log(route.params?.selectedCardTitle);

  const imagePicker = () => {
    let options = {
      mediaType: 'photo',
      storageOptions: {
        path: 'image',
      },
    };

    console.log("dds" + currentDocId)

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

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
    setExpireDatePickerVisibility(false); // Close the other date picker if open
  };

  const showExpireDatePicker = () => {
    setExpireDatePickerVisibility(true);
    setStartDatePickerVisibility(false); // Close the other date picker if open
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideExpireDatePicker = () => {
    setExpireDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date: any) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    hideStartDatePicker();
    setPrevSelectedDate(date);
  };

  const handleExpireDateConfirm = (date: any) => {
    const formattedDate = formatDate(date);
    setExpireDate(formattedDate);
    hideExpireDatePicker();
    setPrevExpireDate(date);
  };

  const formatDate = (date: any) => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const newDt = x[0].split('-');
    return newDt[2] + '/' + newDt[1] + '/' + newDt[0];
  };

  // useEffect(() => {
  //   setSelectedCardIndex(initialIndex); // Update selectedCardIndex when the component receives a new initialIndex
  // }, [initialIndex]);

  const onPressDateSelected = (value: boolean) => {
    setIsStartingDateSelected(value);
    if (value) {
      showStartDatePicker();
    } else {
      showExpireDatePicker();
    }
  };

  const gotoItemDetailsPage = (params: any) => {
    crossButton();
    navigation.navigate('ItemDetails', params);
  };

  const onDonePress = async () => {
    if (title !== '' && imageSelect !== null) {
      try {
        const userId = getUserId();
  
        if (isEditPress) {
          // Update existing document
          const docId = currentDocId // Assuming you pass the docId as a param
          if (!docId) {
            throw new Error('Document ID not found');
          }
  
          await firestore().collection('lists').doc(docId).update({
            title: title,
            imgUrl: imageSelect,
            startDate: selectedDate,
            endDate: expireDate,
            reminderTxt: reminderText,
            noteTxt: noteText,
            updatedAt: new Date(),
          });
  
          console.log('Document successfully updated!');
          const updatedData = {
            title: title,
            imgUrl: imageSelect,
            startDate: selectedDate,
            endDate: expireDate,
            reminderTxt: reminderText,
            noteTxt: noteText,
            selectedCardCategory: userData?.cardCategoryTitle,
          };
          gotoItemDetailsPage({ updatedData, docId });
        } else {
          // Create new document (existing logic)
          const newDocRef = firestore().collection('lists').doc();
          
          await firestore()
           .runTransaction(async (transaction) => {
              const doc = await transaction.get(newDocRef);
              if (!doc.exists) {
                transaction.set(newDocRef, {
                  selectedCardCategory: userData?.cardCategoryTitle,
                  userId: userId,
                  docId: newDocRef.id,
                  title: title,
                  imgUrl: imageSelect,
                  startDate: selectedDate,
                  endDate: expireDate,
                  reminderTxt: reminderText,
                  noteTxt: noteText,
                  createdAt: new Date(),
                });
              }
            });
  
          console.log('Document successfully written!');
          const docId = newDocRef.id;
          const updatedData = {
            title: title,
            imgUrl: imageSelect,
            startDate: selectedDate,
            endDate: expireDate,
            reminderTxt: reminderText,
            noteTxt: noteText,
            selectedCardCategory: userData?.cardCategoryTitle,
          };
          gotoItemDetailsPage({ updatedData, docId });
        }
  
      } catch (error) {
        console.error('Error updating document: ', error);
        Alert.alert('Error', 'Failed to update item. Please try again.');
      }
    } else {
      Alert.alert('Please enter a title and select an image');
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
              <TouchableOpacity style={{ marginBottom: responsiveHeight(0.1) }}>
                <TextInputComp
                  textColor={COLORS.textColor}
                  placeholder="Add Title"
                  backgroundColor={COLORS.background}
                  placeholderTextColor={COLORS.placeholderTextColor}
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
                backgroundColor={COLORS.background}
                imageUrl={imageSelect && { uri: imageSelect }}
                ImgHeight={responsiveHeight(20)}
                ImgWidth={responsiveWidth(36)}
              />
              <TouchableOpacity
                style={[styles.plusCircleContainer, plusCircleStyles]}
                onPress={imagePicker}>
                {isImageSelected && (
                  <View style={styles.imageBoxContainer}>{''}</View>
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
                <Text style={styles.calendarBoxTxtStyle}>{selectedDate}</Text>
                <View style={styles.calendarContainerView}>
                  <Icon name="calendar-month" size={25} color={COLORS.calenderIconTintColor} />
                </View>
              </Pressable>
              <View style={{ marginLeft: responsiveWidth(4) }}>
                <Pressable
                  style={styles.calendarBox}
                  onPress={() => onPressDateSelected(false)}>
                  <Text style={styles.calendarBoxTxtStyle}>{expireDate}</Text>
                  <View style={styles.calendarContainerView}>
                    <Icon name="calendar-month" size={25} color={COLORS.calenderIconTintColor} />
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
            <View style={{ marginBottom: responsiveHeight(1) }}>
              <Text style={styles.subText}>Select Reminder</Text>
            </View>
            <View style={styles.selectReminderView}>
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
                <Text style={styles.calendarBoxTxtStyle}>{reminderText}</Text>
                <View style={styles.calendarContainerView}>
                  <FontIcon name="bell" size={20} color={COLORS.calenderIconTintColor} />
                </View>
              </Pressable>
            </View>
            <View style={styles.addNoteView}>
              <TextInputComp
                textColor={COLORS.textColor}
                multiline={true}
                placeholder="&nbsp;&nbsp;Add Note"
                placeholderTextColor={COLORS.placeholderTextColor}
                backgroundColor={COLORS.background}
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
              isVisible={
                isStartingDateSelected
                  ? isStartDatePickerVisible
                  : isExpireDatePickerVisible
              }
              mode="date"
              date={isStartingDateSelected ? prevSelectedDate : prevExpireDate}
              onConfirm={
                isStartingDateSelected
                  ? handleStartDateConfirm
                  : handleExpireDateConfirm
              }
              onCancel={
                isStartingDateSelected
                  ? hideStartDatePicker
                  : hideExpireDatePicker
              }
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
    backgroundColor: COLORS.addItemCardBG,
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
    paddingTop: responsiveHeight(2),
  },
  subText: {
    fontSize: responsiveFontSize(2),
    color: COLORS.textColor,
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
    backgroundColor: COLORS.background,
    borderRadius: 10,
  },
  calendarBoxTxtStyle: {
    color: COLORS.calenderPlaceHolderTextColor,
    fontSize: 12,
    textAlign: 'center',
    paddingTop: responsiveHeight(2),
    marginLeft: responsiveWidth(4),
    fontWeight: 'bold',
  },
  contentContainerView: { flexGrow: 1 },
  imageBoxContainer: {
    backgroundColor: COLORS.addItemCardBG,
    height: responsiveHeight(6),
    width: responsiveWidth(11),
    borderRadius: 8,
    position: 'absolute',
    top: responsiveHeight(5),
    right: responsiveWidth(12),
  },
  calendarContainerView: {
    position: 'absolute',
    bottom: responsiveHeight(1.5),
    marginLeft: responsiveWidth(2),
  },
  addReminderView: { flex: 1 },
  selectReminderView: { alignItems: 'center', height: responsiveHeight(5) },
  addNoteView: { alignItems: 'center', marginTop: responsiveHeight(2) },
});
