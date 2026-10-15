import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import styleSheet from './TagStyles';
import { TagDefaultProps, type TagProps } from './TagTypes';

/**
 * The Tag component.
 * A small, non-interactive pill on a soft accent background, used for highlights.
 * @param {TagProps} props - The props for the Tag component.
 * @returns {React.ReactElement} A React element.
 */
const Tag: React.FC<TagProps> = (props) => {
  const { label, customStyle, testID = TagDefaultProps.testID! } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.tag, customStyle]} testID={testID}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const MemoizedTag = memo(Tag);
MemoizedTag.displayName = 'Tag';

export default MemoizedTag;
