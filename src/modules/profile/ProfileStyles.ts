import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the Profile screen.
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
    content: {
      paddingBottom: scale(24),
      paddingHorizontal: scale(15)
    },
    section: {
      marginTop: scale(15)
    },
    separator: {
      backgroundColor: Colors[theme]?.border,
      height: StyleSheet.hairlineWidth
    },
    signOutButton: {
      height: scale(42),
      marginTop: scale(15)
    },
    signOutTitle: {
      fontSize: scale(14),
      fontWeight: '700'
    },
    stats: {
      marginTop: scale(16)
    }
  });

export default styleSheet;
