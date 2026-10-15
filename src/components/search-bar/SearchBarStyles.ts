import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the SearchBar component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      borderColor: Colors[theme]?.border,
      borderRadius: scale(14),
      borderWidth: StyleSheet.hairlineWidth * 2,
      flexDirection: 'row',
      gap: scale(8),
      height: scale(40),
      paddingHorizontal: scale(13)
    },
    input: {
      color: Colors[theme]?.textPrimary,
      flex: 1,
      fontSize: scale(14),
      height: '100%',
      paddingVertical: 0
    }
  });

export default styleSheet;
