// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { AnalyticsScreen, SettingsScreen, TasksScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name.toLowerCase()) {
            case 'tasks':
              iconName = focused ? 'list-circle' : 'list-circle-outline';
              break;
            case 'analytics':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              throw new Error('Unrecognized route.');
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#004968',
        tabBarLabelStyle: [Platform.OS === 'android' && { marginBottom: 2 }],
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export { TabNavigator };
