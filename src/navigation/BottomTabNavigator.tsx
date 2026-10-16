import { Ionicons } from '@expo/vector-icons';
import {
  createNativeBottomTabNavigator,
  type NativeBottomTabIcon
} from '@react-navigation/bottom-tabs/unstable';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState, type FC } from 'react';
import { Platform, type ImageSourcePropType } from 'react-native';
import { ROUTES, Strings } from '../constants';
import { useTheme } from '../hooks';
import { ExploreScreen, ProfileScreen, SavedScreen, TripsScreen } from '../modules';
import { Colors, scale } from '../theme';
import type { BottomTabParamList } from './NavigationTypes';

const Tab = createNativeBottomTabNavigator<BottomTabParamList>();
// const Tab = createBottomTabNavigator<BottomTabParamList>();

/** Any SF Symbol name accepted by the native tab bar. */
type SFSymbolName = Extract<NativeBottomTabIcon, { type: 'sfSymbol' }>['name'];

/** Any Ionicons glyph name. */
type IconName = React.ComponentProps<typeof Ionicons>['name'];

/** Icon names for one tab: SF Symbols on iOS, Ionicons glyphs (as images) on Android. */
interface TabIconNames {
  symbol: SFSymbolName;
  symbolFocused: SFSymbolName;
  glyph: IconName;
  glyphFocused: IconName;
}

/** Android icon images for one tab, rendered from the Ionicons glyphs. */
interface TabIconImages {
  image: ImageSourcePropType;
  imageFocused: ImageSourcePropType;
}

type TabRoute = keyof BottomTabParamList;

const TAB_ICONS: Record<TabRoute, TabIconNames> = {
  [ROUTES.Explore]: {
    symbol: 'safari',
    symbolFocused: 'safari.fill',
    glyph: 'compass-outline',
    glyphFocused: 'compass'
  },
  [ROUTES.Saved]: {
    symbol: 'heart',
    symbolFocused: 'heart.fill',
    glyph: 'heart-outline',
    glyphFocused: 'heart'
  },
  [ROUTES.Trips]: {
    symbol: 'map',
    symbolFocused: 'map.fill',
    glyph: 'map-outline',
    glyphFocused: 'map'
  },
  [ROUTES.Profile]: {
    symbol: 'person',
    symbolFocused: 'person.fill',
    glyph: 'person-outline',
    glyphFocused: 'person'
  }
};

/**
 * Renders the Ionicons glyphs to images on Android, since the native tab bar
 * draws (and tints) icons itself and can't render React components.
 * @param {string} color - The color to render the glyphs in.
 * @returns {Partial<Record<TabRoute, TabIconImages>>} The icon images, empty until loaded.
 */
const useAndroidTabIconImages = (color: string): Partial<Record<TabRoute, TabIconImages>> => {
  const [images, setImages] = useState<Partial<Record<TabRoute, TabIconImages>>>({});

  useEffect(() => {
    if (Platform.OS !== 'android') return undefined;
    let isMounted = true;
    const size = scale(24);
    Promise.all(
      (Object.keys(TAB_ICONS) as TabRoute[]).map(async (route) => {
        const [image, imageFocused] = await Promise.all([
          Ionicons.getImageSource(TAB_ICONS[route].glyph, size, color),
          Ionicons.getImageSource(TAB_ICONS[route].glyphFocused, size, color)
        ]);
        return [route, image, imageFocused] as const;
      })
    ).then((entries) => {
      if (!isMounted) return;
      const loaded: Partial<Record<TabRoute, TabIconImages>> = {};
      entries.forEach(([route, image, imageFocused]) => {
        if (image && imageFocused) loaded[route] = { image, imageFocused };
      });
      setImages(loaded);
    });
    return () => {
      isMounted = false;
    };
  }, [color]);

  return images;
};

/**
 * Creates a native tab bar icon resolver: an SF Symbol on iOS, an image on Android.
 * @param {TabRoute} route - The tab the icon belongs to.
 * @param {TabIconImages} [images] - The Android icon images, once loaded.
 * @returns {(props: { focused: boolean }) => NativeBottomTabIcon} The tab bar icon resolver.
 */
const createTabIcon =
  (route: TabRoute, images?: TabIconImages) =>
  ({ focused }: { focused: boolean }): NativeBottomTabIcon =>
    Platform.OS === 'ios' || !images
      ? {
          type: 'sfSymbol',
          name: focused ? TAB_ICONS[route].symbolFocused : TAB_ICONS[route].symbol
        }
      : { type: 'image', source: focused ? images.imageFocused : images.image };

/**
 * The BottomTabNavigator Component
 * Defines the tab navigation structure for authenticated users:
 * Explore, Saved, Trips and Profile, using the platform's native tab bar
 * (which moves to the side on iPhone Duo where the system requires it).
 * @returns {React.ReactElement} The BottomTabNavigator component.
 */
const BottomTabNavigator: FC = (): React.ReactElement => {
  const { theme } = useTheme();
  const androidImages = useAndroidTabIconImages(String(Colors[theme]?.textTertiary));

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[theme]?.accent,
        tabBarInactiveTintColor: Colors[theme]?.textTertiary,
        // The native bar sizes itself and applies safe-area insets; only its colors can be set.
        tabBarStyle: {
          backgroundColor: Colors[theme]?.surface,
          shadowColor: Colors[theme]?.border
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
        options={{
          title: Strings.Navigation.explore,
          tabBarIcon: createTabIcon(ROUTES.Explore, androidImages[ROUTES.Explore])
        }}
      />
      <Tab.Screen
        name={ROUTES.Saved}
        component={SavedScreen}
        options={{
          title: Strings.Navigation.saved,
          tabBarIcon: createTabIcon(ROUTES.Saved, androidImages[ROUTES.Saved])
        }}
      />
      <Tab.Screen
        name={ROUTES.Trips}
        component={TripsScreen}
        options={{
          title: Strings.Navigation.trips,
          tabBarIcon: createTabIcon(ROUTES.Trips, androidImages[ROUTES.Trips])
        }}
      />
      <Tab.Screen
        name={ROUTES.Profile}
        component={ProfileScreen}
        options={{
          title: Strings.Navigation.profile,
          tabBarIcon: createTabIcon(ROUTES.Profile, androidImages[ROUTES.Profile])
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
