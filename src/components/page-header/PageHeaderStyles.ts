import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the PageHeader component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      paddingTop: scale(16)
    },
    subtitle: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(13),
      marginTop: scale(4)
    },
    title: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(23),
      fontWeight: '800',
      letterSpacing: -0.5
    }
  });

export default styleSheet;
