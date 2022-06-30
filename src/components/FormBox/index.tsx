import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';
import { Alert } from 'react-native';

interface IFormBoxProps {
  typeProducts: 'kg' | 'product';
}

export function FormBox({ typeProducts }: IFormBoxProps) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleProductAdd = async () => {
    if (!description)
      return Alert.alert('Produto', 'Preencha o Nome do Produto');

    if (!quantity) return Alert.alert('Produto', 'Preencha a quantidade');
    setLoading(true);
    firestore()
      .collection('products')
      .add({
        description,
        quantity,
        kilogram: typeProducts,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoading(false);
        setDescription('');
        setQuantity(null);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Produto', 'Erro ao adicionar produto');
      });
  };

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
        value={description}
      />

      <Input
        placeholder={typeProducts === 'product' ? '0' : 'Kg'}
        keyboardType="numeric"
        size="small"
        onChangeText={(value) => setQuantity(Number(value))}
        value={String(quantity ?? '')}
        style={{ marginHorizontal: 8 }}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleProductAdd}
        isLoading={loading}
      />
    </Container>
  );
}
