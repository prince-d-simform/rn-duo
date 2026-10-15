import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the Chip component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    chip: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      borderColor: Colors[theme]?.border,
      borderRadius: scale(15),
      borderWidth: StyleSheet.hairlineWidth * 2,
      height: scale(29),
      justifyContent: 'center',
      paddingHorizontal: scale(11)
    },
    chipSelected: {
      backgroundColor: Colors[theme]?.chipSelected,
      borderColor: Colors[theme]?.chipSelected
    },
    label: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(12),
      fontWeight: '500'
    },
    labelSelected: {
      color: Colors[theme]?.onChipSelected,
      fontWeight: '600'
    },
    pressed: {
      opacity: 0.7
    }
  });

export default styleSheet;
