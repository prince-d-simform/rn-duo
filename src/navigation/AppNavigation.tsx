import { Ionicons } from '@expo/vector-icons';
import {
  DefaultTheme,
  NavigationContainer,
  type LinkingOptions,
  type Theme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useMemo, type FC } from 'react';
import { type ColorValue, Pressable, StatusBar } from 'react-native';
import { deepLinkPrefixes, ROUTES, Strings } from '../constants';
import { useTheme } from '../hooks';
import { DetailsScreen, SigninScreen, SignupScreen } from '../modules';
import { AuthSelectors, useAppSelector } from '../redux';
import { Colors, scale } from '../theme';
import { navigateBack, navigationRef } from '../utils';
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
      [ROUTES.Details]: 'details',
      [ROUTES.HomeTabs]: {
        screens: {
          [ROUTES.Home]: 'home',
          [ROUTES.Profile]: 'profile'
        }
      }
    }
  }
};

/**
 * The DetailsHeaderLeft Component
 * Renders a back chevron button for the Details screen navigation header.
 * @param {object} props - Component props.
 * @param {ColorValue} [props.tintColor] - The tint color applied to the icon.
 * @returns {React.ReactElement} A pressable back navigation button.
 */
const DetailsHeaderLeft = ({ tintColor }: { tintColor?: ColorValue }): React.ReactElement => (
  <Pressable hitSlop={8} onPress={navigateBack}>
    <Ionicons name="chevron-back" size={scale(24)} color={tintColor} />
  </Pressable>
);

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
          backgroundColor: Colors[theme]?.white
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
            options={{
              headerShown: true,
              title: Strings.Navigation.details,
              headerTitleAlign: 'center',
              headerLeft: DetailsHeaderLeft,
              headerTitleStyle: {
                color: Colors[theme]?.black,
                fontSize: scale(18)
              }
            }}
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

  const navTheme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: isDark,
      colors: {
        ...DefaultTheme.colors,
        primary: Colors[theme]?.black,
        background: Colors[theme]?.white,
        card: Colors[theme]?.white,
        text: Colors[theme]?.black,
        border: Colors[theme]?.black,
        notification: Colors[theme]?.white
      }
    }),
    [theme, isDark]
  );

  /** Hide the splash screen once the navigation tree is ready to render. */
  const handleReady = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      linking={linking}
      onReady={handleReady}
    >
      <StatusBar
        backgroundColor={Colors[theme]?.white}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
