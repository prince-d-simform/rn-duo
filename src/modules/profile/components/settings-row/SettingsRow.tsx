import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../../../../hooks';
import { Colors, scale } from '../../../../theme';
import styleSheet from './SettingsRowStyles';
import { SettingsRowDefaultProps, type SettingsRowProps } from './SettingsRowTypes';

/**
 * The SettingsRow component.
 * A settings list row with a label, an optional current value, and a chevron.
 * @param {SettingsRowProps} props - The props for the SettingsRow component.
 * @returns {React.ReactElement} A React element.
 */
const SettingsRow: React.FC<SettingsRowProps> = (props) => {
  const { label, value, onPress, customStyle, testID = SettingsRowDefaultProps.testID! } = props;
  const { styles, theme } = useTheme(styleSheet);

  return (
    <Pressable
      accessible
      style={({ pressed }) => [styles.row, pressed && styles.pressed, customStyle]}
      disabled={!onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      accessibilityState={{ disabled: !onPress }}
      onPress={onPress}
    >
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={scale(15)} color={Colors[theme]?.textTertiary} />
    </Pressable>
  );
};

const MemoizedSettingsRow = memo(SettingsRow);
MemoizedSettingsRow.displayName = 'SettingsRow';

export default MemoizedSettingsRow;
