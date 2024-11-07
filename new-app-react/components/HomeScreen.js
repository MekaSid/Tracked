// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RecordButton } from './subcomponents/RecordButton';
import { NameBox } from './subcomponents/NameBox';
import WelcomeText from './subcomponents/WelcomeText';
import { ItemList } from './subcomponents/ItemList';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen() {
  const [data, setData] = useState([]); // Start with empty data
  const [nextKey, setNextKey] = useState(1); // Initialize nextKey
  const route = useRoute();

  // Update data when new items are added
  useEffect(() => {
    if (route.params?.newItems) {
      let keyCounter = nextKey;
      const newItemsWithKeys = route.params.newItems.map((item) => {
        const itemWithKey = { ...item, key: keyCounter.toString() };
        keyCounter += 1;
        return itemWithKey;
      });
      setNextKey(keyCounter);
      setData((prevData) => [...prevData, ...newItemsWithKeys]);
    }
  }, [route.params?.newItems]);

  // Function to round numbers to one decimal place
  const roundToOneDecimal = (num) => {
    return Math.round(num * 10) / 10;
  };

  // Function to calculate totals (excluding grams)
  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;

    data.forEach((item) => {
      totalCalories += item.nutrition.calories;
      totalProtein += item.nutrition.protein;
      totalCarbs += item.nutrition.carbs;
    });

    // Round totals to one decimal place
    totalCalories = roundToOneDecimal(totalCalories);
    totalProtein = roundToOneDecimal(totalProtein);
    totalCarbs = roundToOneDecimal(totalCarbs);

    return {
      totalCalories,
      totalProtein,
      totalCarbs,
    };
  };

  // Function to add a new item
  const addItem = () => {
    const newItem = {
      key: nextKey.toString(),
      label: `NEW ITEM: ${nextKey}`,
      isExpanded: false,
      nutrition: { calories: 0, protein: 0, carbs: 0, grams: 0 },
    };
    setNextKey(nextKey + 1);
    setData((prevData) => [...prevData, newItem]);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Welcome Text Section */}
      <WelcomeText message="Hi Sid." />

      {/* NameBox Section - Pass totals to NameBox */}
      <NameBox
        calories={calculateTotals().totalCalories}
        protein={calculateTotals().totalProtein}
        carbs={calculateTotals().totalCarbs}
      />

      {/* ItemList Section - Pass data, setData, and addItem function */}
      <ItemList data={data} setData={setData} addItem={addItem} />

      {/* Record Button */}
      <View style={styles.recordButtonContainer}>
        <RecordButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Full height of the screen
    backgroundColor: '#F5FCFF', // Background color for the screen
    justifyContent: 'space-between', // Space out components evenly
    paddingVertical: 30, // Add some padding at the top and bottom
    paddingHorizontal: 5, // Padding on both sides
    position: 'relative', // Ensure relative positioning for absolute stacking
  },
  recordButtonContainer: {
    position: 'absolute', // Position absolutely to control its placement
    top: '97%', // Adjusted as needed
    left: '51.7%', // Adjusted as needed
    transform: [{ translateX: -50 }, { translateY: -50 }], // Center the button by shifting it back by half its size
    width: 100, // Initial width of the button
    height: 100, // Initial height of the button
    justifyContent: 'center', // Center the button contents
    alignItems: 'center', // Center the button contents
    zIndex: 100, // Ensure it stacks on top
    backgroundColor: 'red', // Example background to visualize
    borderRadius: 50, // Make it a circular button (adjust as needed)
  },
});
