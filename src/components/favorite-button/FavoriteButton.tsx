import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './FavoriteButtonStyles';
import { FavoriteButtonDefaultProps, type FavoriteButtonProps } from './FavoriteButtonTypes';

/**
 * The FavoriteButton component.
 * A round heart toggle for saving items, designed to sit on top of images.
 * @param {FavoriteButtonProps} props - The props for the FavoriteButton component.
 * @returns {React.ReactElement} A React element.
 */
const FavoriteButton: React.FC<FavoriteButtonProps> = (props) => {
  const {
    isFavorite,
    onPress,
    customStyle,
    testID = FavoriteButtonDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles, theme } = useTheme(styleSheet);

  return (
    <Pressable
      accessible
      style={({ pressed }) => [styles.button, pressed && styles.pressed, customStyle]}
      hitSlop={scale(8)}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: isFavorite }}
      onPress={onPress}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={scale(12)}
        color={Colors[theme]?.favorite}
      />
    </Pressable>
  );
};

const MemoizedFavoriteButton = memo(FavoriteButton);
MemoizedFavoriteButton.displayName = 'FavoriteButton';

export default MemoizedFavoriteButton;
