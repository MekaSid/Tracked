import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Material Icons for React Native


export default function CloseButton() {
  const navigation = useNavigation();

  // Function to handle the close button press
  const handlePress = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    // <TouchableOpacity style={styles.button} onPress={handlePress}>
    //   <Text style={styles.text}>x</Text>
    // </TouchableOpacity>

    <TouchableOpacity style = {styles.button} onPress={handlePress}>
          <Icon name="close" size={32} color="#FFFFFF" />
        </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50, // Diameter of the button
    height: 50,
    borderRadius: 25, // Makes it circular
    backgroundColor: '#bfbfbf', // Red color for the button
    justifyContent: 'center',
    alignItems: 'center', // Center the text horizontally and vertically
    position: 'absolute', // Absolute positioning
    top: -200, // Adjust the distance from the top
    right: 0, // Adjust the distance from the right
  },
  text: {
    fontSize: 24, // Font size for the "X"
    color: '#ffffff', // White color for the text
    fontWeight: 'bold', // Bold "X"
  },
});
