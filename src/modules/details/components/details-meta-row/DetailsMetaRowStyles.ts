import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the DetailsMetaRow component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    highlight: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(12),
      fontWeight: '600'
    },
    ratingGroup: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scale(5)
    },
    reviews: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(12)
    },
    row: {
      alignItems: 'center',
      columnGap: scale(11),
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: scale(6)
    }
  });

export default styleSheet;
