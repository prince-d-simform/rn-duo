import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import styleSheet from './PageHeaderStyles';
import { PageHeaderDefaultProps, type PageHeaderProps } from './PageHeaderTypes';

/**
 * The PageHeader component.
 * A large, left-aligned page title with an optional supporting line,
 * used at the top of tab screens instead of a navigation header.
 * @param {PageHeaderProps} props - The props for the PageHeader component.
 * @returns {React.ReactElement} A React element.
 */
const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, subtitle, customStyle, testID = PageHeaderDefaultProps.testID! } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

export default PageHeader;
PageHeader.displayName = 'PageHeader';
