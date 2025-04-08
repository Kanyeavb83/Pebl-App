// screens/OnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pebl</Text>
      <Text style={styles.subtitle}>Speak your truth. Let the ripple reach someone who understands.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PondSelection')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 32, 
    color: '#FFFFFF', 
    marginBottom: 20 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#CCCCCC', 
    textAlign: 'center', 
    marginBottom: 40 
  },
  button: { 
    backgroundColor: '#009688', 
    paddingHorizontal: 40, 
    paddingVertical: 15, 
    borderRadius: 25 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 18 
  }
});
