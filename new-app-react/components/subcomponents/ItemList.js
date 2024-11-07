// ItemList.js
import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, FlatList } from 'react-native';

export function ItemList({ data, setData, addItem }) {
  // Expand/collapse items
  const toggleExpand = (itemKey) => {
    const updatedData = data.map((item) =>
      item.key === itemKey ? { ...item, isExpanded: !item.isExpanded } : item
    );
    setData(updatedData);
  };

  const removeItem = (itemKey) => {
    const updatedData = data.filter((item) => item.key !== itemKey);
    setData(updatedData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={() => toggleExpand(item.key)}>
        <Text style={styles.itemText}>{item.label}</Text>
      </TouchableOpacity>
      {item.isExpanded && (
        <View style={styles.nutritionContainer}>
          <Text style={styles.nutritionText}>Calories: {item.nutrition.calories}</Text>
          <Text style={styles.nutritionText}>Protein: {item.nutrition.protein}g</Text>
          <Text style={styles.nutritionText}>Carbs: {item.nutrition.carbs}g</Text>
          <Text style={styles.nutritionText}>Quantity: {item.nutrition.grams}g</Text>
        </View>
      )}
      <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.key)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.boxContainer}>
      <View style={styles.box}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}

// ... existing styles


const styles = StyleSheet.create({
  boxContainer: {
    height: '100%',
    marginTop: 140,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    flex: 1, // Take up remaining space to the left
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  nutritionContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    marginRight: 52,
  },
  nutritionText: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginVertical: 10,
  },
});
