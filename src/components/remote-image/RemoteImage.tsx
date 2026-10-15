import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './RemoteImageStyles';
import { RemoteImageDefaultProps, type RemoteImageProps } from './RemoteImageTypes';

/**
 * The RemoteImage component.
 * Loads a remote image inside a themed frame, showing a spinner while loading
 * and an image icon fallback if the request fails.
 * @param {RemoteImageProps} props - The props for the RemoteImage component.
 * @returns {React.ReactElement} A React element.
 */
const RemoteImage: React.FC<RemoteImageProps> = (props) => {
  const {
    uri,
    resizeMode = RemoteImageDefaultProps.resizeMode!,
    customStyle,
    testID = RemoteImageDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles, theme } = useTheme(styleSheet);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoadEnd = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  return (
    <View
      style={[styles.frame, customStyle]}
      testID={testID}
      accessible={Boolean(accessibilityLabel)}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility={accessibilityLabel ? 'auto' : 'no-hide-descendants'}
    >
      {!hasError && (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode={resizeMode}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      )}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator color={Colors[theme]?.textSecondary} />
        </View>
      )}
      {hasError && (
        <View style={styles.overlay}>
          <Ionicons name="image-outline" size={scale(24)} color={Colors[theme]?.textTertiary} />
        </View>
      )}
    </View>
  );
};

const MemoizedRemoteImage = memo(RemoteImage);
MemoizedRemoteImage.displayName = 'RemoteImage';

export default MemoizedRemoteImage;
