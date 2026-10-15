import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

export const CAROUSEL_ITEM_SPACING: number = scale(9);

/**
 * Style function for the ExploreListHeader component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    carouselSeparator: {
      width: CAROUSEL_ITEM_SPACING
    },
    categories: {
      marginTop: scale(12)
    },
    container: {
      paddingTop: scale(10)
    },
    search: {
      marginTop: scale(14)
    },
    sectionTitle: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(16),
      fontWeight: '700',
      marginBottom: scale(11),
      marginTop: scale(20)
    },
    weekendTitle: {
      marginBottom: scale(10),
      marginTop: scale(10)
    }
  });

export default styleSheet;
