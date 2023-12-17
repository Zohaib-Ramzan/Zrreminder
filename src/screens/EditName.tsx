import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TextInputComp from '../components/TextInputComp';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ButtonComp from '../components/ButtonComp';
import {UserDataContext} from '../context';
import {useFirebaseAuth, useToastHelper} from '../hooks';

const EditName = ({closeModal}: any) => {
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState('');

  const {userData} = useContext(UserDataContext);
  const {updateUserData} = useFirebaseAuth();
  const {showSuccessToast, showErrorToast} = useToastHelper();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
    }
  }, [userData]);

  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.containerView}>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => closeModal()}>
                <Image
                  source={require('../assets/images/cross.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleTxt}>Edit Name</Text>
            <View style={styles.textInputContainer}>
              <TouchableOpacity style={{marginBottom: responsiveHeight(0.1)}}>
                <TextInputComp
                  placeholder="Your Name"
                  value={name}
                  onChangeText={setName}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <ButtonComp
                text="Done"
                BtnWidth={responsiveWidth(18)}
                onPress={handleOnDone}
                isLoading={isSaving}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );

  function handleOnDone() {
    setIsSaving(true);
    updateUserData({name})
      .then(() => {
        showSuccessToast('Name changed successfully');
        closeModal();
      })
      .catch(error => {
        showErrorToast(error.message);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }
};

export default EditName;

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
    textAlign: 'center',
    marginBottom: responsiveHeight(8),
  },
  textInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: responsiveHeight(17),
    justifyContent: 'flex-end',
  },
  scrollViewContainer: {flexGrow: 1},
});
