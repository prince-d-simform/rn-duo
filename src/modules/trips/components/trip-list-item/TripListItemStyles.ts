import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

const CARD_RADIUS: number = scale(15);
const CARD_BORDER: number = StyleSheet.hairlineWidth * 2;

/**
 * Style function for the TripListItem component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    content: {
      flex: 1,
      marginHorizontal: scale(12)
    },
    dates: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(13),
      marginTop: scale(2)
    },
    first: {
      borderTopLeftRadius: CARD_RADIUS,
      borderTopRightRadius: CARD_RADIUS,
      borderTopWidth: CARD_BORDER
    },
    last: {
      borderBottomLeftRadius: CARD_RADIUS,
      borderBottomRightRadius: CARD_RADIUS,
      borderBottomWidth: CARD_BORDER
    },
    name: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(14),
      fontWeight: '600'
    },
    pressed: {
      opacity: 0.7
    },
    row: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      borderColor: Colors[theme]?.border,
      borderLeftWidth: CARD_BORDER,
      borderRightWidth: CARD_BORDER,
      flexDirection: 'row',
      paddingHorizontal: scale(12),
      paddingVertical: scale(12)
    },
    thumbnail: {
      borderRadius: scale(10),
      height: scale(47),
      width: scale(47)
    }
  });

export default styleSheet;
