import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextInputComp from '../components/TextInputComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import Card from '../components/Card';
import CustomColorPicker from '../components/customColorPicker';
import {COLORS, isEmptyString} from '../constants';
import {CATEGORY_ICONS} from '../assets/images';
import {CategoryProps} from '../interface';
import {useProductsDataHelper, useToastHelper} from '../hooks';

interface AddCategoryProps {
  onCloseModal: void;
  editData?: CategoryProps;
}
const AddCategory = (props: AddCategoryProps) => {
  const {onCloseModal} = props;

  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedBGColor, setSelectedBGColor] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const {showSuccessToast, showErrorToast, showNormalToast} = useToastHelper();
  const {addNewCategory} = useProductsDataHelper();

  useEffect(() => {}, []);

  const onDonePress = () => {
    if (isEmptyString(name)) {
      showNormalToast('Please type a valid name');
      return;
    }
    if (isEmptyString(selectedIcon)) {
      showNormalToast('Please select a category icon');
      return;
    }
    if (isEmptyString(selectedBGColor)) {
      showNormalToast('Please select a color');
      return;
    }

    setIsSaving(true);
    addNewCategory({
      name: name,
      icon: selectedIcon,
      bgColor: selectedBGColor,
    })
      .then(() => {
        showSuccessToast('Category added successfully');
        handleOnClose();
      })
      .catch(() => {
        showErrorToast('Unable to add category, please try again');
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleOnClose = () => {
    setName('');
    setSelectedIcon('');
    setSelectedBGColor('');
    onCloseModal && onCloseModal();
  };

  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={styles.contentContainerView}>
        <View style={styles.containerView}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => handleOnClose()}>
                <Image
                  source={require('../assets/images/cross.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleTxt}>{'Add Category'}</Text>
            <View style={styles.textInputContainer}>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  textColor={COLORS.white}
                  placeholder="Add Title"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  value={name}
                  onChangeText={setName}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.subText}>Select Icons</Text>
            <View style={styles.scrollviewContainer}>
              <ScrollView horizontal>
                <FlatList
                  numColumns={Math.ceil(CATEGORY_ICONS.length / 2)}
                  data={CATEGORY_ICONS}
                  renderItem={({item, index}) => {
                    const isSelected = item.name === selectedIcon;
                    return (
                      <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity
                          style={[isSelected && styles.selectedCardTouchable]}>
                          <Card
                            height={responsiveHeight(9)}
                            width={responsiveWidth(19)}
                            imageUrl={item.icon}
                            ImgHeight={responsiveHeight(7)}
                            ImgWidth={responsiveWidth(18)}
                            backgroundColor={
                              isSelected
                                ? selectedBGColor
                                : COLORS.defaultCardBG
                            }
                            tintColor={COLORS.white}
                            onPress={() => setSelectedIcon(item.name)}
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
                <CustomColorPicker onColorChange={setSelectedBGColor} />
              </View>
              <View style={styles.buttonContainer}>
                <ButtonComp
                  text={'Done'}
                  BtnWidth={responsiveWidth(18)}
                  onPress={onDonePress}
                  isLoading={isSaving}
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
  contentContainerView: {flexGrow: 1},
});
