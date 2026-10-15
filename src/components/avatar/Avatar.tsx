import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './AvatarStyles';
import { AvatarDefaultProps, type AvatarProps } from './AvatarTypes';

/**
 * The Avatar component.
 * Renders a circular avatar with the user's initials on the accent color,
 * falling back to a person icon when no initials are available.
 * @param {AvatarProps} props - The props for the Avatar component.
 * @returns {React.ReactElement} A React element.
 */
const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    initials = AvatarDefaultProps.initials!,
    size = scale(40),
    onPress,
    customStyle,
    testID = AvatarDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles, theme } = useTheme(styleSheet);

  const sizeStyle = useMemo<ViewStyle>(
    () => ({ width: size, height: size, borderRadius: size / 2 }),
    [size]
  );
  const initialsStyle = useMemo<TextStyle>(() => ({ fontSize: size * 0.4 }), [size]);

  return (
    <Pressable
      accessible
      style={({ pressed }) => [styles.avatar, sizeStyle, pressed && styles.pressed, customStyle]}
      disabled={!onPress}
      hitSlop={scale(4)}
      testID={testID}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={accessibilityLabel ?? initials}
      onPress={onPress}
    >
      {initials ? (
        <Text style={[styles.initials, initialsStyle]}>{initials}</Text>
      ) : (
        <Ionicons name="person" size={size / 2} color={Colors[theme]?.onAccent} />
      )}
    </Pressable>
  );
};

export default Avatar;
Avatar.displayName = 'Avatar';
