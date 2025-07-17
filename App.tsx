/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSignup, setShowSignup] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {showSignup ? (
        <SignupScreen onSignInPress={() => setShowSignup(false)} />
      ) : (
        <LoginScreen onGetStartedPress={() => setShowSignup(true)} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

