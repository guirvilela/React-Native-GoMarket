import React, { useState } from 'react';
import { Button } from '../Button';

import { Container } from './styles';

interface IButtonKilogramProps {
  type: 'kg' | 'product';
  setType: (type: 'kg' | 'product') => void;
}

const ButtonsKilogram: React.FC<IButtonKilogramProps> = ({ type, setType }) => {
  return (
    <Container>
      <Button
        title="Produto"
        style={{ flex: 1, marginRight: 8 }}
        active={type === 'product'}
        onPress={() => setType('product')}
      />
      <Button
        title="Kilogramas"
        style={{ flex: 1 }}
        active={type === 'kg'}
        onPress={() => setType('kg')}
      />
    </Container>
  );
};

export default ButtonsKilogram;
