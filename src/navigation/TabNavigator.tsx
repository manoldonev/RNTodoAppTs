import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnalyticsScreen, SettingsScreen, TasksScreen } from '../screens';
import { useTailwind } from '../theming';

const Tab = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => {
  const tw = useTailwind();

  return (
    <Tab.Navigator
      initialRouteName="Tasks"
      screenOptions={({ route }) => ({
        headerStyle: tw`bg-primary`,
        headerTitleStyle: tw`text-on-primary`,
        // HACK: make sure to reflect any changes to tabBarStyle here in the "Add New Item" modal as well (ugly workaround to mimic fullscreen modal in Android)
        tabBarStyle: tw`bg-primary`,
        tabBarLabelStyle: tw`android:mb-0.5`,
        tabBarActiveTintColor: tw.color('text-on-primary'),
        tabBarInactiveTintColor: tw.color('text-on-primary-variant'),
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
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export { TabNavigator };
