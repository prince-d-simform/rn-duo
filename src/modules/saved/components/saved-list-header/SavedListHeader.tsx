import React, { memo } from 'react';
import { View } from 'react-native';
import { ChipGroup, PageHeader } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import styleSheet from './SavedListHeaderStyles';
import { SavedListHeaderDefaultProps, type SavedListHeaderProps } from './SavedListHeaderTypes';

/**
 * The SavedListHeader component.
 * The Saved page title, a places/collections summary, and the collection
 * filter chips. Rendered as the grid's ListHeaderComponent.
 * @param {SavedListHeaderProps} props - The props for the SavedListHeader component.
 * @returns {React.ReactElement} A React element.
 */
const SavedListHeader: React.FC<SavedListHeaderProps> = (props) => {
  const {
    summary,
    filterOptions,
    selectedFilter,
    onSelectFilter,
    customStyle,
    testID = SavedListHeaderDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <PageHeader title={Strings.Saved.title} subtitle={summary} />
      <ChipGroup
        options={filterOptions}
        selectedId={selectedFilter}
        customStyle={styles.filters}
        testID="saved-filters"
        onSelect={onSelectFilter}
      />
    </View>
  );
};

const MemoizedSavedListHeader = memo(SavedListHeader);
MemoizedSavedListHeader.displayName = 'SavedListHeader';

export default MemoizedSavedListHeader;
