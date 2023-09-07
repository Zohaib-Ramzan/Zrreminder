import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Modal
} from 'react-native';
import React, {useState} from 'react';
import HeaderComp from '../components/HeaderComp';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AddItem from './AddItem';


type ListPageProps = NativeStackScreenProps<RootStackParamList, 'ListPage'>;
const ListPage = ({navigation}: ListPageProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  const crossButton = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView  style={styles.containerView}>
      <ScrollView contentContainerStyle={{flex:1}}>
        <HeaderComp onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <Modal visible={modalVisible} transparent>
            <AddItem crossButton={crossButton}/>
          </Modal>
          <Text style={styles.txtStyle}>List Page</Text>
          <Pressable style={styles.imgContainer} onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/images/plus-circle.png')}
              style={styles.imgStyle}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListPage;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#1a1a1c',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStyle: {
    color: '#fff',
  },
  imgStyle: {
    height: responsiveHeight(15),
    width: responsiveWidth(15),
    resizeMode: 'contain',
  },
  imgContainer: {
    position: 'absolute',
    bottom: responsiveHeight(2),
  },
});
