import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';

const {width, height} = Dimensions.get('window');

type IntroProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

const Intro = ({navigation}: IntroProps) => {
  const ref = useRef<any>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const ImgData = [
    require('../assets/images/intro_1.png'),
    require('../assets/images/intro_2.png'),
    require('../assets/images/intro_3.png'),
    require('../assets/images/intro_4.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={{height: height / 2}}>
        <Animated.FlatList
          ref={ref}
          data={ImgData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(parseInt((x / (width - 50)).toFixed(0), 10));
          }}
          // keyExtractor={(item,index) => index.toString()}
          bounces={false}
          renderItem={({item}) => {
            return (
              <Animated.View style={styles.listView}>
                <Image source={item} style={styles.ImgStyle} />
              </Animated.View>
            );
          }}
        />
      </View>
      <View style={styles.circleIndicatorsView}>
        {ImgData.map((item, index) => {
          const indicatorConatinerView = {
            height: currentIndex === index ? 10 : 8,
            width: currentIndex === index ? 10 : 8,
            borderRadius: currentIndex === index ? 5 : 4,
            backgroundColor: currentIndex === index ? '#6c63fe' : 'gray',
            marginLeft: 5,
          };
          return (
            <View key={index} style={indicatorConatinerView}>
              {''}
            </View>
          );
        })}
      </View>
      <View style={styles.btnContainer}>
        {currentIndex === 0 ? null : (
          <Pressable
            style={[
              styles.previousBtn,
              // {width: ImgData.length - 1 == currentIndex ? '100%' : 100},
            ]}
            onPress={() => {
              setCurrentIndex(currentIndex - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt((currentIndex - 1).toString()),
              });
            }}>
            <Text style={styles.btnTxt}>Previous</Text>
          </Pressable>
        )}
        {ImgData.length - 1 === currentIndex ? null : (
          <Pressable
            style={[styles.nextBtn, {width: currentIndex == 0 ? '100%' : 100}]}
            onPress={() => {
              setCurrentIndex(currentIndex + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: parseInt((currentIndex + 1).toString()),
              });
            }}>
            <Text style={styles.btnTxt}>Next</Text>
          </Pressable>
        )}
        {ImgData.length - 1 !== currentIndex ? null : (
          <Pressable
            style={styles.nextBtn}
            onPress={() => navigation.navigate('Login')}>
            <Text>Continue</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgStyle: {
    height: 270,
    width: '90%',
  },
  listView: {
    width: width,
    height: height / 2,
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom: 50,
  },
  circleIndicatorsView: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  previousBtn: {
    backgroundColor: '#6c63fe',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: '#6c63fe',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnTxt: {
    // textAlign: "center",
  },
});
