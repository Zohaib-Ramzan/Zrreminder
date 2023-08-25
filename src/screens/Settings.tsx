import {Pressable, ScrollView, StyleSheet, Text, View, Modal, Image,TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, { useState } from 'react';
import HeaderComp from '../components/HeaderComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/AppNavigator';
import Home from './Home';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonComp from '../components/ButtonComp';
import Icon from "react-native-vector-icons/MaterialIcons";
import TextInputComp from '../components/TextInputComp';
import ChangePassword from './ChangePassword';
import ModalCard from '../components/ModalCard';
import EditName from './EditName';


type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({navigation}: SettingsProps) => {

const [visible , setVisible] = useState(false)
const [confirmVisible , setConfirmVisible] = useState(false);
const [editNameVisible , setEditNameVisible] = useState(false);
const [nameChangedVisible , setNameChangedVisible] = useState(false);

// Go Back and show Password confirmation 
const GoBackPasswordChange = () => {
  setVisible(false);
  setConfirmVisible(true);
}

// Go Back and show Edit Name confirmation 
const GoBackEditName = () => {
  setEditNameVisible(false);
  setNameChangedVisible(true);
}

// close the Password Change Modal
const closePasswordModal = () => {
  setVisible(false);
}

// close the Password Change Confirmation Modal
const closeModalPasswordConfirmation = () => {
  setConfirmVisible(false);
}

// close the Edit Name Modal
const closeEditNameModal = () => {
  setEditNameVisible(false);
}

// close the Edit Name Confirmation Modal
const closeModalEditNameConfirmation = () => {
  setNameChangedVisible(false);
}

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    {/* Modal for Change Password */}
    <Modal visible={visible} transparent>
    <ChangePassword GoBackPasswordChange={GoBackPasswordChange} closePasswordModal={closePasswordModal} />
    </Modal>
    {/* Modal Confirmation For Password */}
    <Modal visible = {confirmVisible} transparent>
        <ModalCard text='Password Changed' height={responsiveHeight(45)} width={responsiveWidth(90)} closeModal={closeModalPasswordConfirmation}/>
    </Modal>
    {/* Modal for Edit Name */}
    <Modal transparent visible={editNameVisible}>
      <EditName GoBackEditName={GoBackEditName} closeModal={closeEditNameModal} />
    </Modal>
    {/* Modal Confirmation For Edit Name */}
    <Modal visible = {nameChangedVisible} transparent>
      <ModalCard text='Name Changed' height={responsiveHeight(45)} width={responsiveWidth(90)} closeModal={closeModalEditNameConfirmation}/>
    </Modal>

    <View style={styles.container}> 
      <View>
        <Text style={styles.txtStyle}>Settings</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonView}>
          <Text style={styles.buttonTextView}>Change Notifications Settings</Text>
        </Pressable>
        <Pressable style={styles.buttonView} onPress={() => {setVisible(true)}}>
          <Text style={styles.buttonTextView}>Change Password</Text>
        </Pressable>
        <Pressable style={styles.buttonView} onPress={() => {setEditNameVisible(true)}}>
          <Text style={styles.buttonTextView}>Edit Name</Text>
        </Pressable>
        <Pressable style={[styles.buttonView,{marginBottom:responsiveHeight(3)}]}>
          <Text style={styles.buttonTextView}>About</Text>
        </Pressable>
        <Pressable style={styles.minibuttonView}>
          <Text style={[styles.buttonTextView, {color: "red"}]}>Delete All Items</Text>
        </Pressable>
        <Pressable style={[styles.minibuttonView,{marginBottom:responsiveHeight(5)}]}>
          <Text style={[styles.buttonTextView, {color: "red"}]}>Delete Account</Text>
        </Pressable>
      </View>
      <View style={styles.logoutButton}>
      <ButtonComp text='Log Out' BtnHeight={responsiveHeight(13)} />
      </View>
     </View> 
     </ScrollView>
     </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1c',
    paddingVertical: responsiveHeight(1)
  },
  txtStyle: {
    fontSize: responsiveFontSize(4),
    color: '#fff',
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(4),
  },
  buttonView: {
    width: responsiveWidth(80),
    height:responsiveHeight(10),
    backgroundColor: '#2c2c34',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  buttonContainer: {
    top:responsiveHeight(5),
    alignItems: 'center',
  },
  buttonTextView: {
    color: "#afafb0" ,
    fontWeight: "bold" ,
    textAlign:"center",
    justifyContent:"center",
  },
  minibuttonView : {
    width: responsiveWidth(60),
    height:responsiveHeight(10),
    backgroundColor: '#2c2c34',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(4)
  }
});
