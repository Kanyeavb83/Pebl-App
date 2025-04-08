// screens/RecordPeblScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const RecordPeblScreen = ({ route, navigation }) => {
  const { selectedPond } = route.params;
  const [recording, setRecording] = useState(null);
  const [recordedURI, setRecordedURI] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Please grant permissions to use the microphone.');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    clearInterval(timerRef.current);
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedURI(uri);
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const handleRecordButton = async () => {
    if (recording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const renderTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pebl for: {selectedPond}</Text>
      <Text style={styles.timer}>{renderTimer()}</Text>
      <TouchableOpacity style={styles.recordButton} onPress={handleRecordButton}>
        <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      {recordedURI && (
        <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate('Inbox')}>
          <Text style={styles.buttonText}>Proceed to Inbox (simulate sending Pebl)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RecordPeblScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    color: '#FFFFFF', 
    marginBottom: 20 
  },
  timer: { 
    fontSize: 32, 
    color: '#FFFFFF', 
    marginBottom: 40 
  },
  recordButton: { 
    backgroundColor: '#009688', 
    padding: 20, 
    borderRadius: 30, 
    marginBottom: 20 
  },
  proceedButton: { 
    backgroundColor: '#1E88E5', 
    padding: 15, 
    borderRadius: 25 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 18 
  }
});
