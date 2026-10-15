/**
 * A collection of colors used in the theme.
 * @type {Object}
 */

// Define the keys for theme colors
type Keys =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'error'
  | 'pink'
  | 'orange'
  | 'lightBlue'
  | 'red'
  | 'darkBlue'
  | 'transparent'
  | 'green';

// Define common keys for colors
type CommonKeys = 'white' | 'black' | 'transparentBlack' | 'transparentWhite';

// Define theme colors with corresponding color values
const themeColors: Record<Keys, string> = {
  primary: '#141414',
  secondary: '#F1C336',
  gray: '#7B7B7B',
  error: '#E53E3E',
  pink: '#BA25EB',
  orange: '#F39C3C',
  lightBlue: '#3787FC',
  red: '#DD2C2C',
  darkBlue: '#374dfc',
  transparent: 'transparent',
  green: '#34A853'
};

// Define common colors with corresponding color values
const commonColors: Record<CommonKeys, string> = {
  white: '#FFFFFF',
  black: '#000000',
  transparentBlack: '#00000000',
  transparentWhite: '#FFFFFF00'
};

// Define semantic keys whose values differ between light and dark themes
type SemanticKeys =
  | 'background'
  | 'surface'
  | 'border'
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'accent'
  | 'accentSoft'
  | 'onAccent'
  | 'chipSelected'
  | 'onChipSelected'
  | 'danger'
  | 'star'
  | 'favorite'
  | 'onMedia'
  | 'onMediaMuted'
  | 'mediaScrim'
  | 'mediaBadge'
  | 'mediaButton'
  | 'mediaOverlayButton'
  | 'placeholder';

// Semantic colors for the light theme
const lightSemanticColors: Record<SemanticKeys, string> = {
  background: '#F4F5F7',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  accent: '#17807C',
  accentSoft: '#E4F2F1',
  onAccent: '#FFFFFF',
  chipSelected: '#111827',
  onChipSelected: '#FFFFFF',
  danger: '#B42318',
  star: '#F59E0B',
  favorite: '#F59E0B',
  onMedia: '#FFFFFF',
  onMediaMuted: '#FFFFFFD9',
  mediaScrim: '#0000008C',
  mediaBadge: '#00000066',
  mediaButton: '#FFFFFFE6',
  mediaOverlayButton: '#FFFFFF47',
  placeholder: '#E5E7EB'
};

// Semantic colors for the dark theme
const darkSemanticColors: Record<SemanticKeys, string> = {
  background: '#0E1116',
  surface: '#171B22',
  border: '#2A313B',
  textPrimary: '#F3F4F6',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  accent: '#2BA8A2',
  accentSoft: '#173B3A',
  onAccent: '#FFFFFF',
  chipSelected: '#F3F4F6',
  onChipSelected: '#111827',
  danger: '#F97066',
  star: '#F59E0B',
  favorite: '#F59E0B',
  onMedia: '#FFFFFF',
  onMediaMuted: '#FFFFFFD9',
  mediaScrim: '#00000099',
  mediaBadge: '#00000080',
  mediaButton: '#FFFFFFE6',
  mediaOverlayButton: '#FFFFFF47',
  placeholder: '#2A313B'
};

// Define ThemeColors as a combination of theme, common, and semantic colors
type ThemeColors = Record<Keys, string> & Record<CommonKeys, string> & Record<SemanticKeys, string>;

/**
 * A light theme object.
 * @returns {ThemeColors}
 */
const light: ThemeColors = {
  ...themeColors,
  ...lightSemanticColors,
  black: commonColors.black,
  white: commonColors.white,
  transparentWhite: commonColors.transparentWhite,
  transparentBlack: commonColors.transparentBlack
};

/**
 * A dark theme object.
 * @returns {ThemeColors}
 */
const dark: ThemeColors = {
  ...themeColors,
  ...darkSemanticColors,
  black: commonColors.white,
  white: commonColors.black,
  transparentWhite: commonColors.transparentBlack,
  transparentBlack: commonColors.transparentWhite
};

export enum ThemeModeEnum {
  'light' = 'light',
  'dark' = 'dark',
  'system' = 'system'
}

export type ThemeMode = ThemeModeEnum.light | ThemeModeEnum.dark;

export default { light, dark };
