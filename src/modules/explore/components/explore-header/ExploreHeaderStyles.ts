import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the ExploreHeader component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    date: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(13),
      marginBottom: scale(2)
    },
    textContainer: {
      flex: 1,
      marginRight: scale(12)
    },
    title: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(23),
      fontWeight: '800',
      letterSpacing: -0.5
    }
  });

export default styleSheet;
