import React from 'react';

import { ButtonIcon } from '../ButtonIcon';
import { Container, Info, Title, Quantity, Options } from './styles';
import firestore from '@react-native-firebase/firestore';

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
  kilogram: string;
};

type Props = {
  data: ProductProps;
};

export function Product({ data }: Props) {
  const handleDoneToggle = () => {
    firestore().collection('products').doc(data.id).update({
      done: !data.done,
    });
  };

  const handleDeleteProduct = () => {
    firestore().collection('products').doc(data.id).delete();
  };

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>
          Quantidade: {data.quantity}
          {data.kilogram == 'kg' && (data.quantity < 10 ? ' kg ' : ' gramas ')}
        </Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? 'undo' : 'check'}
          onPress={handleDoneToggle}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDeleteProduct} />
      </Options>
    </Container>
  );
}
