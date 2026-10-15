import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './SearchBarStyles';
import { SearchBarDefaultProps, type SearchBarProps } from './SearchBarTypes';

/**
 * The SearchBar component.
 * A rounded search input with a leading search icon and an optional clear button.
 * @param {SearchBarProps} props - The props for the SearchBar component.
 * @returns {React.ReactElement} A React element.
 */
const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {
    value,
    onChangeText,
    placeholder = SearchBarDefaultProps.placeholder!,
    onClear,
    clearAccessibilityLabel,
    customStyle,
    testID = SearchBarDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles, theme } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]}>
      <Ionicons name="search-outline" size={scale(17)} color={Colors[theme]?.textSecondary} />
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors[theme]?.textSecondary}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
        testID={testID}
        accessibilityRole="search"
        accessibilityLabel={accessibilityLabel ?? placeholder}
        onChangeText={onChangeText}
      />
      {onClear && value.length > 0 && (
        <Pressable
          hitSlop={scale(8)}
          testID={`${testID}-clear`}
          accessibilityRole="button"
          accessibilityLabel={clearAccessibilityLabel}
          onPress={onClear}
        >
          <Ionicons name="close-circle" size={scale(18)} color={Colors[theme]?.textTertiary} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
SearchBar.displayName = 'SearchBar';
