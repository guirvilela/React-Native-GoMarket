import React from 'react';

import { Container, Account, Title, Subtitle } from './styles';
import auth from '@react-native-firebase/auth';
// import  from '@react-native-community/cli-platform-android';

import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const handleSiginAnonymously = async () => {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input placeholder="e-mail" keyboardType="email-address" />

      <Input placeholder="senha" secureTextEntry />

      <Button title="Entrar" onPress={handleSiginAnonymously} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText title="Criar minha conta" onPress={() => {}} />
      </Account>
    </Container>
  );
}
