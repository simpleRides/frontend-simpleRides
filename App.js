import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import RidesScreen from './screens/RidesScreen';
import SignInScreen from './screens/SignInScreen';
import CGVScreen from './screens/CGVScreen';
import SyncAppScreen from './screens/SyncAppScreen';
import LandingScreen from './screens/LandingScreen';
import DefaultPageScreen from './screens/DefaultPageScreen';

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Rides') {
            iconName = 'car-sport';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: SIMPLE_RIDE_THEME.colors.primary,
        tabBarInactiveTintColor: SIMPLE_RIDE_THEME.colors.lightGrey,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Rides" component={RidesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Theming the app
const SIMPLE_RIDE_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#28272A',
    black: '#262626',
    primary: '#FFA62B',
    light: '#FFFFFF',
    lightGrey: '#545454',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={SIMPLE_RIDE_THEME}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ animation: 'none' }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="CGV" component={CGVScreen} />
          <Stack.Screen name="SyncApp" component={SyncAppScreen} />
          <Stack.Screen name="DefaultPage" component={DefaultPageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
