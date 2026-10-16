import {
  DefaultTheme,
  NavigationContainer,
  type LinkingOptions,
  type Theme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useMemo, type FC } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { deepLinkPrefixes, ROUTES, Strings } from '../constants';
import { useAppState, useTheme } from '../hooks';
import { DetailsScreen, SigninScreen, SignupScreen } from '../modules';
import { AuthSelectors, useAppSelector } from '../redux';
import { Colors } from '../theme';
import { navigationRef } from '../utils';
import BottomTabNavigator from './BottomTabNavigator';
import type { RootStackParamList } from './NavigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Deep link configuration mapping URL paths to screens.
 * e.g. `<scheme>details` → Details, `<scheme>profile` → Profile tab.
 */
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: deepLinkPrefixes,
  config: {
    screens: {
      [ROUTES.SignIn]: 'signin',
      [ROUTES.SignUp]: 'signup',
      [ROUTES.Details]: 'details/:destinationId',
      [ROUTES.HomeTabs]: {
        screens: {
          [ROUTES.Explore]: 'explore',
          [ROUTES.Saved]: 'saved',
          [ROUTES.Trips]: 'trips',
          [ROUTES.Profile]: 'profile'
        }
      }
    }
  }
};

/**
 * The RootNavigator Component
 * Renders the auth screens or the app screens depending on the user's login state.
 * React Navigation swaps the screens automatically when `isLoggedIn` changes.
 * @returns {React.ReactElement} The root native stack navigator.
 */
const RootNavigator: FC = (): React.ReactElement => {
  const { theme } = useTheme();
  const isLoggedIn = useAppSelector(AuthSelectors.getIsLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors[theme]?.black,
        headerStyle: {
          backgroundColor: Colors[theme]?.white
        },
        headerTitleStyle: {
          color: Colors[theme]?.black
        },
        contentStyle: {
          backgroundColor: Colors[theme]?.background
        },
        navigationBarColor: Colors[theme]?.white
      }}
    >
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name={ROUTES.HomeTabs} component={BottomTabNavigator} />
          <Stack.Screen
            name={ROUTES.Details}
            component={DetailsScreen}
            options={{ title: Strings.Navigation.details }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={ROUTES.SignIn}
            component={SigninScreen}
            options={{ title: Strings.Navigation.signIn }}
          />
          <Stack.Screen
            name={ROUTES.SignUp}
            component={SignupScreen}
            options={{ title: Strings.Navigation.signUp }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

/**
 * The AppNavigation Component
 * Hosts the NavigationContainer with the shared navigationRef, deep linking,
 * and a navigation theme that mirrors the app's dark/light Colors.
 * @returns {React.ReactElement} The AppNavigation component.
 */
const AppNavigation: FC = (): React.ReactElement => {
  const { theme, isDark } = useTheme();
  // Logs active ⇄ inactive ⇄ background transitions (demo: Split View on iPhone Duo).
  useAppState();

  const navTheme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: isDark,
      colors: {
        ...DefaultTheme.colors,
        primary: Colors[theme]?.accent,
        background: Colors[theme]?.background,
        card: Colors[theme]?.surface,
        text: Colors[theme]?.textPrimary,
        border: Colors[theme]?.border,
        notification: Colors[theme]?.accent
      }
    }),
    [theme, isDark]
  );

  /** Hide the splash screen once the navigation tree is ready to render. */
  const handleReady = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);
  const windowDimensions = useWindowDimensions();
  console.log('AppNavigation.tsx windowDimensions ----', windowDimensions);
  const insets = useSafeAreaInsets();
  console.log('AppNavigation.tsx insets ----', insets);
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      linking={linking}
      onReady={handleReady}
    >
      <StatusBar
        backgroundColor={Colors[theme]?.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
