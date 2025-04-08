// screens/PondSelectionScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ponds = [
  { id: '1', name: 'Work' },
  { id: '2', name: 'Relationships' },
  { id: '3', name: 'Dreams' },
  { id: '4', name: 'Gaming' },
  { id: '5', name: 'Personal Help' },
  { id: '6', name: 'Sports' },
];

const PondSelectionScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pondButton}
      onPress={() => navigation.navigate('RecordPebl', { selectedPond: item.name })}
    >
      <Text style={styles.pondText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ponds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PondSelectionScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    padding: 20 
  },
  listContainer: { 
    alignItems: 'center' 
  },
  pondButton: { 
    backgroundColor: '#1E1E1E', 
    paddingHorizontal: 30, 
    paddingVertical: 15, 
    borderRadius: 20, 
    marginVertical: 10, 
    width: '80%', 
    alignItems: 'center' 
  },
  pondText: { 
    color: '#FFFFFF', 
    fontSize: 18 
  }
});
