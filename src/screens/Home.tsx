import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Card from '../components/Card';
import BottomNav from '../routes/BottomNav';
import AddCategory from './AddCategory';
import {CardData} from './types';

const Home = () => {
  const [closeCategoryModal, setCloseCategoryModal] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<CardData | null>(
    null,
  );

  const plusCircleImg = () => {
    return require("../assets/images/plus-circle.png");
  }

  const [selectedCardDataArray, setSelectedCardDataArray] = useState<
    CardData[]
  >([
    {
      backgroundColor: '#2c2c34',
      onPress: () => setCloseCategoryModal(true),
      imgUrl: plusCircleImg()
    }
  ]);
  {console.log(selectedCardDataArray)}

  // const closeAddCategoryModal = (selectedCardDataArray: any) => {
  //   setSelectedCardDataArray(selectedCardDataArray);
  //   setCloseCategoryModal(false);
  // };

  const crossButton = () => {
    return setCloseCategoryModal(false);
  };

  const closeModal = (selectedData: CardData) => {
    setSelectedCardDataArray(prevDataArray => [selectedData, ...prevDataArray]);  
  };

  return (
    <View style={styles.container}>
      <Modal transparent visible={closeCategoryModal}>
        <AddCategory
          crossButton={crossButton}
          closeAddCategoryModal={closeModal}
        />
      </Modal>
      <View style={styles.hometxtView}>
      <Text style={styles.txtStyle}>Zohaib's Personal Categories</Text>
      </View>
      {selectedCardDataArray.length > 0 && (
        <View>
          <FlatList 
            style={{ height: responsiveHeight(68) , bottom: responsiveHeight(3) }}
            numColumns={2}
            data={selectedCardDataArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <Card
                  backgroundColor={item.imgUrl === plusCircleImg() ? "#2c2c34" : item.backgroundColor}
                  onPress={item.onPress}
                  text={item.title}
                  imageUrl={item.imgUrl}
                  ImgHeight={responsiveHeight(15)}
                  ImgWidth={item.imgUrl === plusCircleImg() ? responsiveWidth(13) : responsiveWidth(40)}
                  cardStyles={{
                    marginLeft: responsiveWidth(5),
                    marginTop: responsiveHeight(4),
                  }}>
                  </Card>
              );
            }}
          />
       </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1c',
  },
  txtStyle: {
    fontSize: responsiveFontSize(5),
    color: '#FBFFFF',
    marginLeft: responsiveWidth(2),
    marginBottom: responsiveWidth(8),
    fontFamily: "AlegreyaSans-Medium"
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
    marginLeft: responsiveWidth(2)
    
  }
});
