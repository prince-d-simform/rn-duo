import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '../../hooks';
import { Chip } from '../chip';
import styleSheet from './ChipGroupStyles';
import { ChipGroupDefaultProps, type ChipGroupProps, type ChipOption } from './ChipGroupTypes';

/**
 * The ChipGroup component.
 * A horizontally scrolling row of chips with single selection, used for
 * filters such as categories or collections.
 * @param {ChipGroupProps<T>} props - The props for the ChipGroup component.
 * @returns {React.ReactElement} A React element.
 */
const ChipGroup = <T extends string>(props: ChipGroupProps<T>): React.ReactElement => {
  const {
    options,
    selectedId,
    onSelect,
    customStyle,
    testID = ChipGroupDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={customStyle}
      contentContainerStyle={styles.content}
      testID={testID}
      accessibilityRole="tablist"
    >
      {options.map((option: ChipOption<T>) => (
        <Chip
          key={option.id}
          label={option.label}
          selected={option.id === selectedId}
          testID={`${testID}-${option.id}`}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </ScrollView>
  );
};

export default ChipGroup;
ChipGroup.displayName = 'ChipGroup';
