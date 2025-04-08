// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import PondSelectionScreen from './screens/PondSelectionScreen';
import RecordPeblScreen from './screens/RecordPeblScreen';
import InboxScreen from './screens/InboxScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: '#FFFFFF' }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PondSelection" component={PondSelectionScreen} options={{ title: 'Choose Your Pond' }} />
        <Stack.Screen name="RecordPebl" component={RecordPeblScreen} options={{ title: 'Record Your Pebl' }} />
        <Stack.Screen name="Inbox" component={InboxScreen} options={{ title: 'Your Ripple Inbox' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
