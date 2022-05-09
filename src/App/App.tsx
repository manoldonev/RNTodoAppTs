// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import { useRefetchOnAppFocus, useRefetchOnReconnect } from './hooks';
import { TasksScreen } from '../screens/tasks';
import { AnalyticsScreen, SettingsScreen } from '../screens';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  useRefetchOnReconnect();
  useRefetchOnAppFocus();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Tasks"
              screenOptions={({ route }) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
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
          </NavigationContainer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export { App };
