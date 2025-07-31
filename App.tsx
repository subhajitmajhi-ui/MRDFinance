/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import MeScreen from './screens/MeScreen';
import BottomNavigation from './components/BottomNavigation';
import Drawer from './components/Drawer';
import LoadingScreen from './src/components/LoadingScreen';
import { useAuth } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} /> }>
      <Tab.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Flow" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
      <Tab.Screen name="Add" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
      <Tab.Screen name="Discover" component={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />} />
      <Tab.Screen name="Me" component={MeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

