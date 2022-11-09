import React, { useState } from 'react';

import { Container, Account, Title, Subtitle } from './styles';
import auth from '@react-native-firebase/auth';

import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSigin = () => {
    if (!email) {
      return Alert.alert('Login', 'Email é obrigatório');
    }
    if (!password) {
      return Alert.alert('Login', 'Digite sua senha');
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((err) => {
        if (
          err.code === 'auth/wrong-password' ||
          err.code === 'auth/user-not-found'
        ) {
          Alert.alert('Login', 'Nome ou senha inválida');
        }
      });
  };

  const handleCreateNewAccount = () => {
    if (!email) {
      return Alert.alert('Criar conta', 'Digite um email');
    }
    if (!password) {
      return Alert.alert('Criar conta', 'Digite uma senha');
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Criar conta', 'Usuário criado com sucesso');
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          return Alert.alert('Criar conta', 'E-mail já em uso');
        }
        if (err.code === 'auth/invalid-email') {
          return Alert.alert('Criar conta', 'E-mail inválido');
        }
        if (err.code === 'auth/weak-password') {
          return Alert.alert(
            'Criar conta',
            'A senha deve ter no mínimo 6 caracteres',
          );
        }
      });
  };

  const handlePasswordReset = () => {
    if (!email) {
      return Alert.alert('Criar conta', 'Digite um email');
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Recuperar Senha',
          'Enviamos um email para recuperar sua senha',
        );
      })
      .catch((err) => {
        return Alert.alert('Recuperar Senha', 'Email inválido');
      });
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSigin} active />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handlePasswordReset} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateNewAccount}
        />
      </Account>
    </Container>
  );
}
