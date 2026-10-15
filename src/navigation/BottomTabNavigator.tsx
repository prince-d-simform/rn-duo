import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { type FC } from 'react';
import { type ColorValue } from 'react-native';
import { ROUTES, Strings } from '../constants';
import { useTheme } from '../hooks';
import { ExploreScreen, ProfileScreen, SavedScreen, TripsScreen } from '../modules';
import { Colors, scale } from '../theme';
import type { BottomTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/** Type definition for tab bar icon components. */
interface TabIconProps {
  color: ColorValue;
}

/** Any Ionicons glyph name. */
type IconName = React.ComponentProps<typeof Ionicons>['name'];

/**
 * Creates a tab bar icon renderer for an Ionicons glyph.
 * @param {IconName} name - The Ionicons glyph to render.
 * @returns {(props: TabIconProps) => React.ReactElement} The tab bar icon renderer.
 */
const createTabIcon = (name: IconName) => {
  /**
   * Renders the tab bar icon in the tab's active or inactive color.
   * @param {TabIconProps} props - Icon color for the tab's current state.
   * @returns {React.ReactElement} The tab icon.
   */
  const TabIcon = ({ color }: TabIconProps): React.ReactElement => (
    <Ionicons name={name} size={scale(20)} color={color} />
  );
  return TabIcon;
};

const ExploreTabIcon = createTabIcon('compass-outline');
const SavedTabIcon = createTabIcon('heart-outline');
const TripsTabIcon = createTabIcon('map-outline');
const ProfileTabIcon = createTabIcon('person-outline');

/**
 * The BottomTabNavigator Component
 * Defines the tab navigation structure for authenticated users:
 * Explore, Saved, Trips and Profile, with themed styling.
 * @returns {React.ReactElement} The BottomTabNavigator component.
 */
const BottomTabNavigator: FC = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: Colors[theme]?.background
        },
        tabBarActiveTintColor: Colors[theme]?.accent,
        tabBarInactiveTintColor: Colors[theme]?.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors[theme]?.surface,
          borderTopColor: Colors[theme]?.border,
          paddingTop: scale(6)
        },
        tabBarLabelStyle: {
          fontSize: scale(11),
          fontWeight: '500'
        }
      }}
    >
      <Tab.Screen
        name={ROUTES.Explore}
        component={ExploreScreen}
        options={{ title: Strings.Navigation.explore, tabBarIcon: ExploreTabIcon }}
      />
      <Tab.Screen
        name={ROUTES.Saved}
        component={SavedScreen}
        options={{ title: Strings.Navigation.saved, tabBarIcon: SavedTabIcon }}
      />
      <Tab.Screen
        name={ROUTES.Trips}
        component={TripsScreen}
        options={{ title: Strings.Navigation.trips, tabBarIcon: TripsTabIcon }}
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
