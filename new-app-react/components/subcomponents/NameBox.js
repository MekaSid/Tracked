import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export function NameBox({ calories, protein, carbs, sugars }) {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.box}>
        <Text style={styles.titleText}>CALORIES: {calories}</Text>
        <Text style={styles.titleText}>PROTEIN (G): {protein}</Text>
        <Text style={styles.titleText}>CARBS (G): {carbs}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    marginTop: 0,
    marginLeft: -85,
    width: '100%',
    flex: 2,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  box: {
    width: '50%',
    height: 130, // Adjust the height to accommodate more text
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the left side of the box
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});
