import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../../hooks';
import styleSheet from './ChipStyles';
import { ChipDefaultProps, type ChipProps } from './ChipTypes';

/**
 * The Chip component.
 * A pill-shaped selectable option, used for filters and categories.
 * @param {ChipProps} props - The props for the Chip component.
 * @returns {React.ReactElement} A React element.
 */
const Chip: React.FC<ChipProps> = (props) => {
  const {
    label,
    selected = ChipDefaultProps.selected!,
    onPress,
    customStyle,
    testID = ChipDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <Pressable
      accessible
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
        customStyle
      ]}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected }}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
};

const MemoizedChip = memo(Chip);
MemoizedChip.displayName = 'Chip';

export default MemoizedChip;
