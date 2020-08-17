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
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Navigator types, used for title bar and for tabs
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// Tabs are cool
function TabBar() {
  return (
    <Tab.Navigator initialRouteName="Home" shifting={true}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarColor: '#a0a6e2',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" color="white" size={26} />
          ),
        }}
        component={Feed}
      />
      <Tab.Screen
        name="All Fish"
        options={{
          tabBarColor: '#8a84ce',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fish" color="white" size={26} />
          ),
        }}
        component={AllFish}
      />
      <Tab.Screen
        name="Leaders"
        options={{
          tabBarColor: '#ff9391',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-trophy" color="white" size={26} />
          ),
        }}
        component={LeaderBoards}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarColor: '#ffb1c1',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-settings" color="white" size={26} />
          ),
        }}
        component={Settings}
      />
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
