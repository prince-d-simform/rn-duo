import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the DetailsFooter component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    actions: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scale(8)
    },
    container: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface,
      borderTopColor: Colors[theme]?.border,
      borderTopWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: scale(15),
      paddingTop: scale(11)
    },
    duration: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(11),
      marginLeft: scale(4)
    },
    fromLabel: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(11)
    },
    planTripButton: {
      height: scale(41),
      width: scale(92)
    },
    planTripTitle: {
      fontSize: scale(13),
      fontWeight: '700'
    },
    price: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(17),
      fontWeight: '800'
    },
    priceRow: {
      alignItems: 'baseline',
      flexDirection: 'row'
    }
  });

export default styleSheet;
