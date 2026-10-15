import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

export const SCREEN_HORIZONTAL_PADDING: number = scale(15);

/**
 * Style function for the Explore screen.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      backgroundColor: Colors[theme]?.background,
      flex: 1
    },
    listContent: {
      paddingBottom: scale(16),
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING
    },
    rowSeparator: {
      backgroundColor: Colors[theme]?.border,
      height: StyleSheet.hairlineWidth
    }
  });

export default styleSheet;
