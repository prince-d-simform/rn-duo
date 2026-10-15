import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './EmptyStateStyles';
import { EmptyStateDefaultProps, type EmptyStateProps } from './EmptyStateTypes';

/**
 * The EmptyState component.
 * A centered icon, title, and message for screens or lists with no content.
 * @param {EmptyStateProps} props - The props for the EmptyState component.
 * @returns {React.ReactElement} A React element.
 */
const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const { icon, title, message, customStyle, testID = EmptyStateDefaultProps.testID! } = props;
  const { styles, theme } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <View style={styles.iconWrapper} importantForAccessibility="no-hide-descendants">
        <Ionicons name={icon} size={scale(28)} color={Colors[theme]?.accent} />
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

export default EmptyState;
EmptyState.displayName = 'EmptyState';
