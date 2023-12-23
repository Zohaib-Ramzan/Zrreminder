import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';

const AddReminderPage = ({
  crossButton,
  initialData,
  initialIndex,
  onValueSelected,
}: any) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );
  const [selectedCardData, setSelectedCardData] = useState<any>(null);

  const [mainDataIndex, setMainDataIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<any>(-1);
  const data = [
    'Same Day as Expiration    ',
    '2 Days Before Expiration   ',
    '5 Days Before Expiration   ',
    '1 Week Before Expiration  ',
    '2 Weeks Before Expiration',
    '3 Weeks Before Expiration',
    '4 Weeks Before Expiration',
  ];

  useEffect(() => {
    setMainDataIndex(initialIndex);
    console.log('selectedXardIndex' + initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSelectedCardIndex(initialData.imgUrl - 1); // Assuming "index" is a property in initialData
      setSelectedCardData(initialData); // Set the whole initialData object
    }
  }, [initialData]);

  const onChecked = (index: number) => {
    setSelectedItemIndex(index);
  };

  const onDonePress = () => {
    if (selectedItemIndex > -1) {
      onValueSelected(data[selectedItemIndex]);
      crossButton();
    } else {
      Alert.alert('Please Select Card!');
    }
  };

  return (
    <TouchableWithoutFeedback>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
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
          <Text style={styles.titleTxt}>Reminder</Text>
          <View style={styles.cardContainerView}>
            <Pressable style={styles.cardContainer}>
              <View>
                <FlatList
                  data={data}
                  renderItem={({ item, index }) => {
                    const isChecked = selectedItemIndex === index;
                    const reminderTextColor = isChecked
                      ? { color: COLORS.white }
                      : { color: COLORS.addReminderPageNonSelectTextColor };
                    console.log(selectedItemIndex);
                    return (
                      <View key={index} style={styles.reminderTxtContainer}>
                        <TouchableOpacity
                          style={styles.reminderItem}
                          onPress={() => onChecked(index)}>
                          {isChecked && (
                            <Icon
                              name="check"
                              size={25}
                              color={COLORS.white}
                              style={styles.checkStyle}
                            />
                          )}

                          <Text style={[styles.reminderTxt, reminderTextColor]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </Pressable>
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
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
};

export default AddReminderPage;

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
    tintColor: COLORS.iconTintColor,
    height: responsiveHeight(4),
    width: responsiveWidth(4),
  },
  titleTxt: {
    fontSize: responsiveFontSize(3.5),
    color: COLORS.white,
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
    height: responsiveHeight(62),
    width: responsiveWidth(85),
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
  cardContainerView: {
    alignItems: 'center',
    justifyContent: 'center',
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
  reminderTxt: {
    color: COLORS.white,
    fontSize: responsiveFontSize(2.7),
  },
  reminderTxtContainer: {
    alignItems: 'center',
    // flexDirection: 'row', // Arrange items horizontally
    // flexWrap: 'wrap',
  },
  reminderItem: {
    marginBottom: responsiveHeight(4),
  },
  checkStyle: {
    position: 'absolute',
    right: responsiveWidth(65),
  },
});
