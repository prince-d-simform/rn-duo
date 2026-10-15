import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the SettingsRow component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    label: {
      color: Colors[theme]?.textPrimary,
      flex: 1,
      fontSize: scale(14),
      fontWeight: '500'
    },
    pressed: {
      backgroundColor: Colors[theme]?.background
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scale(8),
      height: scale(43),
      paddingHorizontal: scale(14)
    },
    value: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(13)
    }
  });

export default styleSheet;
