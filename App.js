import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feed } from './pages/feed/feed';
import { AllFish } from './pages/allfish/allfish';
import { Settings } from './pages/settings/settings';
import { Map } from './pages/map/map';
import { FishContextProvider } from './pages/FishContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Navigator types, used for title bar and for tabs
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tabs are cool
function TabBar() {
  return (
    <FishContextProvider>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-home" color={color} size={26} />
            ),
          }}
          component={Feed}
        />
        <Tab.Screen
          name="All Fish"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="fish" color={color} size={26} />
            ),
          }}
          component={AllFish}
        />
        <Tab.Screen
          name="Map"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-map" color={color} size={26} />
            ),
          }}
          component={Map}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-settings" color={color} size={26} />
            ),
          }}
          component={Settings}
        />
      </Tab.Navigator>
    </FishContextProvider>
  );
}

// Main app itself, stack container within a tab
const App = ({ navigation, ...rest }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabBar}
        options={{
          title: 'ACNH FishTrack',
        }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

//TODO: figure out how to make the apps reload when clicked on,
// the storage needs to be reloaded on button click to make sense

export default StackWrapper = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
