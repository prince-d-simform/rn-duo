import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Pressable, type ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './IconButtonStyles';
import { IconButtonDefaultProps, type IconButtonProps } from './IconButtonTypes';

/**
 * The IconButton component.
 * An icon-only button, either a translucent circle for use over images
 * or a bordered rounded square for regular surfaces.
 * @param {IconButtonProps} props - The props for the IconButton component.
 * @returns {React.ReactElement} A React element.
 */
const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    icon,
    onPress,
    variant = IconButtonDefaultProps.variant!,
    size = variant === 'overlay' ? scale(32) : scale(41),
    iconSize = scale(18),
    iconColor,
    selected,
    customStyle,
    testID = IconButtonDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles, theme } = useTheme(styleSheet);
  const isOverlay = variant === 'overlay';

  const sizeStyle = useMemo<ViewStyle>(
    () => ({
      width: size,
      height: size,
      ...(isOverlay ? { borderRadius: size / 2 } : {})
    }),
    [size, isOverlay]
  );

  return (
    <Pressable
      accessible
      style={({ pressed }) => [
        styles.button,
        isOverlay ? styles.overlay : styles.outlined,
        sizeStyle,
        pressed && styles.pressed,
        customStyle
      ]}
      hitSlop={scale(6)}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={selected === undefined ? undefined : { selected }}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={iconSize}
        color={iconColor ?? (isOverlay ? Colors[theme]?.onMedia : Colors[theme]?.textPrimary)}
      />
    </Pressable>
  );
};

export default IconButton;
IconButton.displayName = 'IconButton';
