import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feed } from './pages/feed/feed';
import { AllFish } from './pages/allfish/allfish';
import { LeaderBoards } from './pages/leaderboards/leaderboards';
import { Settings } from './pages/settings/settings';

// Navigator types, used for title bar and for tabs
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Tabs are cool
function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen name="Home" component={Feed} />
      <Tab.Screen name="All Fish" component={AllFish} />
      <Tab.Screen name="Leaders" component={LeaderBoards} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Main app itself, stack container within a tab
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabBar}
          options={{ title: 'ACNH FishTrack' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
