import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, width, type ThemeMode } from '../../theme';

const HORIZONTAL_PADDING: number = scale(15);
export const EXPERIENCE_CARD_SPACING: number = scale(9);

/**
 * Style function for the Details screen.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    body: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: scale(16)
    },
    container: {
      backgroundColor: Colors[theme]?.background,
      flex: 1
    },
    description: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(12),
      lineHeight: scale(18),
      marginTop: scale(14)
    },
    experienceCard: {
      width: (width - HORIZONTAL_PADDING * 2 - EXPERIENCE_CARD_SPACING) / 2
    },
    experienceSeparator: {
      width: EXPERIENCE_CARD_SPACING
    },
    notFound: {
      flex: 1,
      justifyContent: 'center'
    },
    notFoundBack: {
      left: HORIZONTAL_PADDING,
      position: 'absolute'
    },
    scrollContent: {
      paddingBottom: scale(28)
    },
    sectionTitle: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(16),
      fontWeight: '700',
      marginBottom: scale(10),
      marginTop: scale(20)
    },
    tags: {
      gap: scale(7)
    },
    tagsList: {
      marginTop: scale(14)
    }
  });

export default styleSheet;
