// AddScreen.js
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddText from './subcomponents/AddText';
import CloseButton from './subcomponents/CloseButton';
import SubmitFood from './subcomponents/SubmitFood';

export default function AddScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // State to hold the text input from AddText
  const [text, setText] = useState('');

  // Trigger the fade-in animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to fully visible
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Function to handle the submit button press
  const handleSubmit = () => {
    // Send the sentence to the backend server
    fetch('http://127.0.0.1:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence: text }),
    })
      .then(async (response) => {
        const responseText = await response.text();
        try {
          const data = JSON.parse(responseText);
          console.log('Success:', data);
          if (data.error) {
            Alert.alert('Error', data.error);
            return;
          }
          // Navigate back to 'Home' with the new data
          navigation.navigate('Home', { newItems: data.items });
        } catch (error) {
          console.error('JSON Parsing Error:', error);
          console.log('Response Text:', responseText);
          Alert.alert('Error', 'Failed to process your input.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to process your input.');
      });
  };

  return (
    <View style={styles.container}>
      {/* The background remains static */}
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Close Button to go back */}
        <CloseButton />

        {/* AddText component to input the text */}
        <AddText text={text} setText={setText} />

        {/* Submit button */}
        <SubmitFood onPress={handleSubmit} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Static background color
  },
});
