import {View, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const CustomColorPicker = ({onColorChange}: any) => {
  const colors = [
    {key: '1', hexColor: '#d6d6d6'},
    {key: '2', hexColor: '#72c9d1'},
    {key: '3', hexColor: '#8ac185'},
    {key: '4', hexColor: '#ffd37f'},
    {key: '5', hexColor: '#ffabc7'},
    {key: '6', hexColor: '#7868d8'},
  ];
  const [selectedColor, setSelectedColor] = useState('');
  const handleColorPress = (hexColor: string) => {
    setSelectedColor(hexColor === selectedColor ? '' : hexColor);
    console.log('Your color is: ' + hexColor);
    onColorChange(hexColor === selectedColor ? '#464657' : hexColor);
  };
  return (
    <View style={styles.container}>
      {colors.map(col => (
        <Pressable
          key={col.key}
          style={[
            styles.colorContainer,
            {backgroundColor: col.hexColor},
            selectedColor === col.hexColor ? styles.selectedColor : null,
          ]}
          onPress={() => handleColorPress(col.hexColor)}
        />
      ))}
    </View>
  );
};

export default CustomColorPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: responsiveWidth(5),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  colorContainer: {
    marginLeft: 9,
    borderRadius: 50,
    padding: 10,
    // alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#909190',
  },
});
