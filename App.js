import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyle: { backgroundColor: '#000000' }
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Ambulance Siren'
          }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen}
          options={{
            title: 'About',
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
        <Stack.Screen 
          name="Privacy" 
          component={PrivacyPolicyScreen}
          options={{
            title: 'Privacy Policy',
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
