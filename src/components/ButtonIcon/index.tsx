import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Load } from './styles';
import theme from '../../theme';

type Props = TouchableOpacityProps & {
  color?: 'success' | 'alert';
  size?: 'small' | 'large';
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  isLoading?: boolean;
};

export function ButtonIcon({
  color = 'success',
  size = 'small',
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Container activeOpacity={0.8} color={color} size={size} {...rest}>
      {isLoading ? (
        <Load />
      ) : (
        <MaterialIcons
          name={icon}
          size={size === 'small' ? 18 : 24}
          color={theme.COLORS.WHITE}
        />
      )}
    </Container>
  );
}
