import { Dimensions, Platform, type ScaledSize } from 'react-native';

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 375;

const guidelineBaseHeight: number = 812;

/**
 * The current window width and height. These are live bindings: they are
 * updated by `updateMetrics` whenever the window size changes (rotation,
 * Split View, folding/unfolding), so always read them at render time.
 */
let width: number = 0;
let height: number = 0;

// The base size `scale` multiplies by, derived from the current window.
let baseSize: number = 1;

/**
 * Recomputes the metrics from a window size. Called with the initial window
 * below and by `useTheme` on every size change; a no-op when nothing changed.
 * @param {Pick<ScaledSize, 'width' | 'height'>} window - The current window size.
 * @returns None
 */
const updateMetrics = (window: Pick<ScaledSize, 'width' | 'height'>): void => {
  if (window.width === width && window.height === height) return;

  width = window.width;
  height = window.height;

  // Scale from the short and long sides so rotating the window doesn't resize the UI.
  const baseWidth: number = Math.min(width, height) / guidelineBaseWidth;
  const baseHeight: number = Math.max(width, height) / guidelineBaseHeight;

  // Consider 1.2 as a threshold for identifying tablets based on analyzing multiple devices.
  const isTablet: boolean =
    (Platform.OS === 'ios' && Platform.isPad) || (baseWidth + baseHeight) / 2 > 1.2;

  // Adjust the base size based on whether the device is identified as a tablet or not.
  baseSize = (baseWidth + baseHeight) * (isTablet ? 0.4 : 0.5);
};

updateMetrics(Dimensions.get('window'));

/**
 * Converts the provided size based on the calculated base size.
 * @param {number} size - The screen's size that UI element should cover
 * @returns {number} The scaled size depending on the current device's screen size.
 */
const scale = (size: number, disableCeil: boolean = false): number =>
  disableCeil ? size * baseSize : Math.ceil(size * baseSize);

/**
 * A type that contains the global metrics for the current device.
 * @typedef {Object} GlobalMetricsType - A type that contains the global metrics for the current device.
 * @property {boolean} isAndroid - Whether the current device is an Android device.
 */
interface GlobalMetricsType {
  isAndroid: boolean;
  isIos: boolean;
  isPad: boolean;
  isTV: boolean;
  isWeb: boolean;
}

/**
 * A type that contains the global metrics for the app.
 * @type {GlobalMetricsType}
 */
const globalMetrics: GlobalMetricsType = {
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  isPad: Platform.OS === 'ios' && Platform.isPad,
  isTV: Platform.isTV,
  isWeb: Platform.OS === 'web'
};

export { globalMetrics, guidelineBaseWidth, scale, updateMetrics, width, height };
