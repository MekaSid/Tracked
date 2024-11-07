// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';

// export default function AddText() {
//   const [text, setText] = useState(''); // State to store the input text

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Food..." // Placeholder text
//         value={text.toUpperCase()} // Display the text in uppercase
//         onChangeText={(value) => setText(value)} // Update the state when text changes
//         multiline={true} // Enable multiline input
//         textAlignVertical="top" // Align text to the top
//         autoCapitalize="none" // Prevent automatic capitalization by the keyboard
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 0, // Adjust margin as needed
//     top: -140, // Vertical position adjustment
//   },
//   input: {
//     height: 400, // Set a fixed height for the input box
//     width: 400, // Set a fixed width for the input box
//     borderWidth: 0, // No border around the text box
//     paddingHorizontal: 10, // Horizontal padding inside the input box
//     paddingVertical: 10, // Vertical padding inside the input box
//     fontSize: 30, // Large font size for text input
//     fontFamily: 'serif', // Set the font to serif
//     textAlignVertical: 'top', // Ensure text starts from the top
//   },
// });


import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function AddText({ text, setText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter the food you ate..."
        value={text} // The current value of the text input
        onChangeText={setText} // Update the parent state when text changes
        multiline={true} // Enable multiline input
        textAlignVertical="top" // Align text to the top
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0, // Adjust margin as needed
    top: -140, // Vertical position adjustment
  },
  input: {
    height: 400, // Set a fixed height for the input box
    width: 400, // Set a fixed width for the input box
    borderWidth: 0, // No border around the text box
    paddingHorizontal: 10, // Horizontal padding inside the input box
    paddingVertical: 10, // Vertical padding inside the input box
    fontSize: 30, // Large font size for text input
    fontFamily: 'serif', // Set the font to serif
    textAlignVertical: 'top', // Ensure text starts from the top
  },
});
