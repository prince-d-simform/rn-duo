import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the ProfileStats component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    label: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(12),
      marginTop: scale(2)
    },
    row: {
      flexDirection: 'row',
      paddingVertical: scale(14)
    },
    stat: {
      alignItems: 'center',
      flex: 1
    },
    value: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(21),
      fontWeight: '800'
    }
  });

export default styleSheet;
