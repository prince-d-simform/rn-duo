import React, { memo } from 'react';
import { PageHeader } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import styleSheet from './TripsListHeaderStyles';
import { TripsListHeaderDefaultProps, type TripsListHeaderProps } from './TripsListHeaderTypes';

/**
 * The TripsListHeader component.
 * The Trips page title and planned-trips summary. Rendered as the list's ListHeaderComponent.
 * @param {TripsListHeaderProps} props - The props for the TripsListHeader component.
 * @returns {React.ReactElement} A React element.
 */
const TripsListHeader: React.FC<TripsListHeaderProps> = (props) => {
  const { summary, customStyle, testID = TripsListHeaderDefaultProps.testID! } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <PageHeader
      title={Strings.Trips.title}
      subtitle={summary}
      customStyle={[styles.container, customStyle]}
      testID={testID}
    />
  );
};

const MemoizedTripsListHeader = memo(TripsListHeader);
MemoizedTripsListHeader.displayName = 'TripsListHeader';

export default MemoizedTripsListHeader;
