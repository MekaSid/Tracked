// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from './components/AddScreen'; // Changed import to AddScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Ensure route names match those used in navigation */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Add"
          component={AddScreen} // Updated component to AddScreen
          options={{
            headerShown: false, // Hide header if not needed
            animationEnabled: false, // Disable the default slide animation
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container expands to full height
  },

  background: {
    flex: 1, // Takes full height and width
    backgroundColor: '#f7f7f7', // The red background color
    justifyContent: 'center', // Center the content vertically
  },
});
