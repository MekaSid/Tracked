import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class WelcomeText extends Component {
  render() {
    const { style, message } = this.props; // Allow passing custom styles and message from the parent
    return (
      <View style={[styles.container, style]}>
        {/* Static Text component for the welcome message */}
        <Text style={styles.text}>
          {message || 'Welcome to the App!'} {/* Display the message prop or default text */}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    top: 15,
    marginVertical: 10, // Adds vertical space between components
    alignSelf: 'center', // Center horizontally by default
  },
  text: {
    fontSize: 40, // Adjust font size
    fontWeight: 'bold', // Makes the text bold
    color: '#333', // Set the text color
    textAlign: 'center', // Center the text
    padding: 10, // Padding around the text
    borderRadius: 10, // Optional rounded corners, can remove if not needed
  },
});
