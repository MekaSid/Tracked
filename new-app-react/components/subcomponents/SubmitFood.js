import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Material Icons for React Native

export default function SubmitFood({ onPress }) {
  // The onPress prop will handle the action when the button is pressed
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="check" size={32} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50, // Diameter of the button
    height: 50,
    borderRadius: 25, // Makes it circular
    backgroundColor: '#000000', // Black color for the button
    justifyContent: 'center',
    alignItems: 'center', // Center the icon horizontally and vertically
    position: 'absolute', // Absolute positioning
    top: -200, // Adjust the distance from the top
    right: 60, // Adjust the distance from the right
  },
});
