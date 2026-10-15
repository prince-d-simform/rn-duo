import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the ProfileHeader component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      alignItems: 'center'
    },
    name: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(23),
      fontWeight: '800',
      letterSpacing: -0.5,
      marginTop: scale(14),
      textAlign: 'center'
    },
    subtitle: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(13),
      marginTop: scale(4),
      textAlign: 'center'
    }
  });

export default styleSheet;
