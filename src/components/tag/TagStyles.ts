import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the Tag component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    label: {
      color: Colors[theme]?.accent,
      fontSize: scale(11),
      fontWeight: '600'
    },
    tag: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.accentSoft,
      borderRadius: scale(13),
      height: scale(25),
      justifyContent: 'center',
      paddingHorizontal: scale(9)
    }
  });

export default styleSheet;
