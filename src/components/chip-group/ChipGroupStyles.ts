import { StyleSheet } from 'react-native';
import { ApplicationStyles, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the ChipGroup component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    content: {
      gap: scale(8)
    }
  });

export default styleSheet;
