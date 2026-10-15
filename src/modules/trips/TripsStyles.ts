import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the Trips screen.
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
      paddingHorizontal: scale(15)
    },
    separator: {
      backgroundColor: Colors[theme]?.border,
      borderColor: Colors[theme]?.border,
      height: StyleSheet.hairlineWidth
    }
  });

export default styleSheet;
