import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens
import Home from '../screens/Home';
import Search from '../screens/FeedSearch';
import Notifications from '../screens/Notification';
import Profile from '../screens/Profile';
import ProfileSettings from '../screens/ProfileSettings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Komponen untuk Stack Navigator di dalam Tab
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={Search} />
    </Stack.Navigator>
  );
}

function NotificationsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="NotificationsScreen" component={Notifications} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
    </Stack.Navigator>
  );
}

// Tab Navigator
const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home-outline';
              break;
            case 'Search':
              iconName = 'search-outline';
              break;
            case 'Notifications':
              iconName = 'notifications-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3a86ff',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'center',
        },
        tabBarIconStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default Navigation;
