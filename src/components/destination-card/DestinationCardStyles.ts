import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  guidelineBaseWidth,
  scale,
  width,
  type ThemeMode
} from '../../theme';

/** Card width on the 375pt design width, used to derive the card's share of the window. */
const DESIGN_CARD_WIDTH: number = 140;

/** Card height on the 375pt design width, used for the card's aspect ratio. */
const DESIGN_CARD_HEIGHT: number = 186;

/**
 * Card width as the same share of the window width as in the design
 * (140pt of 375pt), e.g. 150pt on a 402pt-wide phone. Read at render time,
 * since the window width can change.
 * @returns {number} The card width.
 */
export const getDestinationCardWidth = (): number =>
  Math.round((width * DESIGN_CARD_WIDTH) / guidelineBaseWidth);

/**
 * Style function for the DestinationCard component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    card: {
      aspectRatio: DESIGN_CARD_WIDTH / DESIGN_CARD_HEIGHT,
      borderRadius: scale(13),
      overflow: 'hidden',
      width: getDestinationCardWidth()
    },
    country: {
      color: Colors[theme]?.onMediaMuted,
      fontSize: scale(12),
      marginTop: scale(1)
    },
    favorite: {
      position: 'absolute',
      right: scale(9),
      top: scale(9)
    },
    image: {
      ...StyleSheet.absoluteFill
    },
    info: {
      bottom: 0,
      left: 0,
      paddingBottom: scale(10),
      paddingHorizontal: scale(10),
      paddingTop: scale(24),
      position: 'absolute',
      right: 0
    },
    name: {
      color: Colors[theme]?.onMedia,
      fontSize: scale(15),
      fontWeight: '700'
    },
    pressed: {
      opacity: 0.9
    },
    rating: {
      left: scale(9),
      position: 'absolute',
      top: scale(9)
    },
    scrim: {
      bottom: 0,
      experimental_backgroundImage: `linear-gradient(to bottom, ${Colors[theme]?.transparentBlack}, ${Colors[theme]?.mediaScrim})`,
      height: '50%',
      left: 0,
      position: 'absolute',
      right: 0
    }
  });

export default styleSheet;
