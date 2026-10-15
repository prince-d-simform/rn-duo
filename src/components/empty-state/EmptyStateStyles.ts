import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the EmptyState component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      alignItems: 'center',
      gap: scale(8),
      justifyContent: 'center',
      paddingHorizontal: scale(32),
      paddingVertical: scale(40)
    },
    iconWrapper: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      borderRadius: scale(32),
      height: scale(64),
      justifyContent: 'center',
      marginBottom: scale(8),
      width: scale(64)
    },
    message: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(14),
      lineHeight: scale(20),
      textAlign: 'center'
    },
    title: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(17),
      fontWeight: '700',
      textAlign: 'center'
    }
  });

export default styleSheet;
