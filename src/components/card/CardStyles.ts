import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the Card component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    card: {
      backgroundColor: Colors[theme]?.surface,
      borderColor: Colors[theme]?.border,
      borderRadius: scale(15),
      borderWidth: StyleSheet.hairlineWidth * 2,
      overflow: 'hidden'
    }
  });

export default styleSheet;
