import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { useColorScheme, useWindowDimensions, type ColorSchemeName } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import { MMKVKeys } from '../constants';
import { ThemeModeEnum, updateMetrics, type ThemeMode } from '../theme';

/**
 * A theme hook that returns the current theme and whether it is dark.
 * It also keeps the shared Metrics (`width`, `height`, `scale`) in sync with the
 * window size and rebuilds the styles when the window is resized.
 * @param {(theme: ThemeMode) => T} styleSheetFn? - A function that returns a style sheet for the theme.
 * @returns An object with the following properties:
 * - isDark: boolean - flag for whether the theme is dark or not.
 * - theme: ThemeMode - current theme mode.
 * - styles?: T - current theme mode based styles.
 * - changeTheme: (value: ThemeMode) => void - if do you want to need to change current theme mode.
 */
const useTheme = <T>(
  styleSheetFn?: (theme: ThemeMode, isDark?: boolean) => T
): {
  isDark: boolean;
  theme: ThemeMode;
  styles: T;
  changeTheme: (value: ThemeMode) => void;
} => {
  const theme: ColorSchemeName = useColorScheme();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  // Keep Metrics current before any style or scale() value is computed this render.
  updateMetrics({ width: windowWidth, height: windowHeight });
  const [themeMode, setThemeMode] = useMMKVString(MMKVKeys.themeMode);
  const currentThemeMode = useMemo<ThemeMode>(
    () =>
      (_.isEqual(themeMode ?? ThemeModeEnum.system, ThemeModeEnum.system)
        ? (theme ?? ThemeModeEnum.light)
        : themeMode) as ThemeMode,
    [theme, themeMode]
  );
  const isDark = useMemo<boolean>(
    () => currentThemeMode === ThemeModeEnum.dark,
    [currentThemeMode]
  );
  const styles = useMemo<T>(
    () => (styleSheetFn?.(currentThemeMode, isDark) ?? {}) as T,
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rebuild when Metrics change
    [styleSheetFn, currentThemeMode, isDark, windowWidth, windowHeight]
  );
  const changeTheme = useCallback<(value: ThemeMode) => void>(
    (value: ThemeMode) => {
      setThemeMode(String(value));
    },
    [setThemeMode]
  );
  return { isDark, theme: currentThemeMode, styles, changeTheme };
};
export default useTheme;
