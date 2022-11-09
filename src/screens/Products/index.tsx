import React, { useState } from 'react';

import { ShoppingList } from '../../components/ShoppingList';
import { FormBox } from '../../components/FormBox';
import { Header } from '../../components/Header';
import { Container } from './styles';
import ButtonsKilogram from '../../components/ButtonsKilogram';

export function Products() {
  const [typeProduct, setTypeProduct] = useState<'kg' | 'product'>('product');

  return (
    <Container>
      <Header title="Lista de compras" showLogoutButton />
      <ButtonsKilogram type={typeProduct} setType={setTypeProduct} />

      <FormBox typeProducts={typeProduct} />
      <ShoppingList />
    </Container>
  );
}
