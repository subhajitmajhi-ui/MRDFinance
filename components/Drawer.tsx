import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { MainTabs } from '../App';

const DrawerNav = createDrawerNavigator();

function DrawerContent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Drawer Content</Text>
    </View>
  );
}

export default function Drawer() {
  return (
    <DrawerNav.Navigator
  drawerContent={() => <DrawerContent />}
  screenOptions={{ headerShown: false }}
>
  <DrawerNav.Screen
    name="MainTabsx"
    component={MainTabs}
    options={{
      drawerLabel: () => null,
      drawerIcon: () => null,
    }}
  />
</DrawerNav.Navigator>
  );
} 