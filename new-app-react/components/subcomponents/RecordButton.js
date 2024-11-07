// import React, { useRef, useEffect } from 'react';
// import { TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native'; 
// import { useNavigation } from '@react-navigation/native'; // Import navigation hook
// import Icon from 'react-native-vector-icons/MaterialIcons';

// // Get screen dimensions
// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', // Center vertically
//     alignItems: 'center', // Center horizontally
//     backgroundColor: '#FFFFFF',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 50,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//     width: 100,
//     height: 100,
//   },
// });

// export function RecordButton() {
//   const navigation = useNavigation(); // Hook for navigation
//   const sizeAnim = useRef(new Animated.Value(100)).current; // Initial size of the button

//   // Function to handle the button press
//   const handlePress = () => {
//     // Animate the button expanding to fill the screen
//     Animated.timing(sizeAnim, {
//       toValue: Math.max(width, height), // Expand to cover full screen
//       duration: 500, // Duration of the animation
//       useNativeDriver: false, // We need this to update width/height
//     }).start(() => {
//       // Once the animation is complete, navigate to the Add screen
//       navigation.navigate('Add');
//     });
//   };

//   // Reset the button size when coming back to this screen
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       Animated.timing(sizeAnim, {
//         toValue: 100, // Reset to original size
//         duration: 300, // Smooth transition back to the original size
//         useNativeDriver: false,
//       }).start();
//     });

//     return unsubscribe; // Clean up the listener on unmount
//   }, [navigation]);

//   return (
//     <Animated.View style={[
//       styles.button, 
//       {
//         width: sizeAnim,
//         height: sizeAnim,
//         borderRadius: sizeAnim.interpolate({
//           inputRange: [100, Math.max(width, height)],
//           outputRange: [50, 0], // Transition from round button to full screen (no border radius)
//         }),
//       }
//     ]}>
//       <TouchableOpacity onPress={handlePress}>
//         <Icon name="add" size={50} color="#000000" />
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// export default RecordButton;

import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the button vertically
    alignItems: 'center', // Center the button horizontally
    //backgroundColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    width: 100,
    height: 100,
  },
});

export function RecordButton() {
  const navigation = useNavigation();
  const sizeAnim = useRef(new Animated.Value(100)).current; // Initial size of the button

  // Function to handle the button press
  const handlePress = () => {
    // Animate the button expanding to fill the screen symmetrically
    Animated.timing(sizeAnim, {
      toValue: Math.max(width, height), // Expand to cover full screen
      duration: 240, // Duration of the animation
      useNativeDriver: false,
    }).start(() => {
      // Once the animation is complete, navigate to the Add screen
      navigation.navigate('Add');
    });
  };

  // Reset the button size when coming back to the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset button size when the screen comes into focus
      Animated.timing(sizeAnim, {
        toValue: 100, // Back to original size
        duration: 220, // Smooth transition back to the original size
        useNativeDriver: false,
      }).start();
    });

    return unsubscribe; // Clean up the listener on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.button,
        {
          width: sizeAnim, // Animate width
          height: sizeAnim, // Animate height
          borderRadius: sizeAnim.interpolate({
            inputRange: [100, Math.max(width, height)],
            outputRange: [50, 0], // Transition from round button to full-screen square
          }),
        },
      ]}>
        <TouchableOpacity onPress={handlePress}>
          <Icon name="add" size={50} color="#000000" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default RecordButton;
