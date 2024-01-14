import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Card from '../components/Card';
import AddCategory from './AddCategory';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import {UserDataContext} from '../context';
import {useCategoryDataHelper, useFirebaseAuth} from '../hooks';
import {COLORS} from '../constants';
import {CategoryProps} from '../interface';
import {getCategoryIconByName} from '../assets/images';
import PlusImg from '../assets/images/plus-circle.png';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const Home = ({navigation}: HomeProps) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const {loadUserData} = useFirebaseAuth();
  const {isLoading: isLoadingCategories, loadCategoriesData} =
    useCategoryDataHelper();
  const {userData, setUserData, categoriesData, setCategoriesData} =
    useContext(UserDataContext);

  useEffect(() => {
    const unSubUserListener = loadUserData(setUserData);
    const unSubCategoriesListener = loadCategoriesData(setCategoriesData);
    return () => {
      unSubUserListener?.();
      unSubCategoriesListener?.();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const gotoListPage = (categoryId: string) => {
    navigation.navigate('ListPage', {categoryId});
  };

  return (
    <View style={styles.container}>
      <Modal transparent visible={showAddCategoryModal}>
        <AddCategory onCloseModal={() => setShowAddCategoryModal(false)} />
      </Modal>
      <View style={styles.hometxtView}>
        <Text style={styles.txtStyle}>
          {`${userData?.name || '...'}'s Personal Categories`}
        </Text>
      </View>
      <View style={styles.body_container}>
        {isLoadingCategories ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : (
          <FlatList
            numColumns={2}
            data={[...categoriesData, 'add_card']}
            renderItem={({item}) => {
              if (item === 'add_card') {
                return (
                  <Card
                    backgroundColor={COLORS.addCardColor}
                    onPress={() => setShowAddCategoryModal(true)}
                    cardTextColor={COLORS.cardTextColor}
                    imageUrl={PlusImg}
                    ImgHeight={responsiveHeight(15)}
                    ImgWidth={responsiveWidth(15)}
                    cardStyles={styles.cardStyles}
                  />
                );
              }
              const catItem: CategoryProps = item;
              return (
                <Card
                  backgroundColor={catItem.bgColor}
                  onPress={() => gotoListPage(catItem.id)}
                  onLongPress={() => {}}
                  text={catItem.name}
                  cardTextColor={COLORS.cardTextColor}
                  imageUrl={getCategoryIconByName(catItem.icon)}
                  ImgHeight={responsiveHeight(15)}
                  ImgWidth={responsiveWidth(40)}
                  cardStyles={[styles.cardStyles]}
                  isLongPressed={false}
                  onPressDelete={() => {}}
                  onPressEdit={() => {}}
                />
              );
            }}
          />
        )}
      </View>
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
  body_container: {
    flex: 1,
  },
});
