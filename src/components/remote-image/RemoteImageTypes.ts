import type { ImageResizeMode, StyleProp, ViewStyle } from 'react-native';

export interface RemoteImageProps {
  /** Remote image URL. */
  uri: string;
  /** How the image is resized within its frame. */
  resizeMode?: ImageResizeMode;
  /** Frame styles (size, border radius). */
  customStyle?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
  /** Screen reader label. When omitted the image is hidden from screen readers. */
  accessibilityLabel?: string;
}

export const RemoteImageDefaultProps: Partial<RemoteImageProps> = {
  resizeMode: 'cover',
  testID: 'remote-image'
} as const;
