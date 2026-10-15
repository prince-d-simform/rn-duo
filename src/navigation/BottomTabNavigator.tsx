import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { type FC } from 'react';
import { type ColorValue } from 'react-native';
import { ROUTES, Strings } from '../constants';
import { useTheme } from '../hooks';
import { HomeScreen, ProfileScreen } from '../modules';
import { Colors, scale } from '../theme';
import type { BottomTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/** Type definition for tab bar icon components. */
interface TabIconProps {
  color: ColorValue;
  focused: boolean;
}

/**
 * The HomeTabIcon Component
 * Renders the Home tab icon — uses a filled icon when the tab is focused
 * and an outline variant when inactive.
 * @param {TabIconProps} props - Icon color and focused state.
 * @returns {React.ReactElement} The Home tab icon.
 */
const HomeTabIcon = ({ color, focused }: TabIconProps): React.ReactElement => (
  <Ionicons name={focused ? 'home' : 'home-outline'} size={scale(22)} color={color} />
);

/**
 * The ProfileTabIcon Component
 * Renders the Profile tab icon — uses a filled icon when the tab is focused
 * and an outline variant when inactive.
 * @param {TabIconProps} props - Icon color and focused state.
 * @returns {React.ReactElement} The Profile tab icon.
 */
const ProfileTabIcon = ({ color, focused }: TabIconProps): React.ReactElement => (
  <Ionicons name={focused ? 'person' : 'person-outline'} size={scale(22)} color={color} />
);

/**
 * The BottomTabNavigator Component
 * Defines the tab navigation structure for authenticated users.
 * Contains Home and Profile tabs with themed styling.
 * @returns {React.ReactElement} The BottomTabNavigator component.
 */
const BottomTabNavigator: FC = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: Colors[theme]?.black,
        headerStyle: {
          backgroundColor: Colors[theme]?.white
        },
        headerTitleStyle: {
          color: Colors[theme]?.black,
          fontSize: scale(18)
        },
        tabBarActiveTintColor: Colors[theme]?.black,
        tabBarInactiveTintColor: Colors[theme]?.gray,
        tabBarStyle: {
          backgroundColor: Colors[theme]?.white,
          borderTopColor: Colors[theme]?.gray,
          paddingBottom: scale(4),
          paddingTop: scale(4)
        },
        tabBarLabelStyle: {
          fontSize: scale(11)
        }
      }}
    >
      <Tab.Screen
        name={ROUTES.Home}
        component={HomeScreen}
        options={{ title: Strings.Navigation.home, tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={ProfileScreen}
        options={{ title: Strings.Navigation.profile, tabBarIcon: ProfileTabIcon }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
