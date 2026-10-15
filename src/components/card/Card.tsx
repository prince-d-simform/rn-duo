import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import styleSheet from './CardStyles';
import { CardDefaultProps, type CardProps } from './CardTypes';

/**
 * The Card component.
 * A rounded, bordered surface that groups related content such as list rows or stats.
 * @param {CardProps} props - The props for the Card component.
 * @returns {React.ReactElement} A React element.
 */
const Card: React.FC<CardProps> = (props) => {
  const { children, customStyle, testID = CardDefaultProps.testID! } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.card, customStyle]} testID={testID}>
      {children}
    </View>
  );
};

export default Card;
Card.displayName = 'Card';
