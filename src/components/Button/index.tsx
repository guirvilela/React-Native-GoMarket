import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  active?: boolean;
};

export function Button({ title, active = false, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} active={active} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
