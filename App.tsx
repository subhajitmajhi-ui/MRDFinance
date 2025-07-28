/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import BottomNavigation from './components/BottomNavigation';
import Drawer from './components/Drawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} /> }>
      <Tab.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Flow" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
      <Tab.Screen name="Add" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
      <Tab.Screen name="Discover" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
      <Tab.Screen name="Me" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
    </Tab.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!isLoggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer />
      )}
    </NavigationContainer>
  );
}

