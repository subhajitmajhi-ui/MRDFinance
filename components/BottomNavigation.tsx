import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const icons = {
  Main: '🏠',
  Flow: '💲',
  Add: '➕',
  Discover: '🔍',
  Me: '👤',
};

export default function BottomNavigation({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            {/* <Text style={[styles.icon, isFocused && styles.iconFocused]}>{icons[route.name]}</Text> */}
            <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#888',
  },
  iconFocused: {
    color: '#de9228',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  labelFocused: {
    color: '#de9228',
    fontWeight: 'bold',
  },
}); 