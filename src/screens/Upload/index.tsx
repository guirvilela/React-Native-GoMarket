import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import {
  Container,
  Content,
  Progress,
  ProgressBar,
  ProgressContainer,
  Transferred,
} from './styles';
import { Alert } from 'react-native';

export function Upload() {
  const [image, setImage] = useState('');
  const [bytesTransferred, setByteTransferred] = useState<string>('');
  const [progress, setProgress] = useState<string>('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  const handleUpload = async () => {
    if (image) {
      const fileName = new Date().getTime();

      const reference = storage().ref(`/images/${fileName}.png`);

      const uploadTask = reference.putFile(image);

      uploadTask.on('state_changed', (taskSnapshot) => {
        const percentage = (
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
        ).toFixed(0);
        setProgress(percentage);

        setByteTransferred(
          `${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`,
        );
      });
      uploadTask.then(() => Alert.alert('Upload', 'Sucesso ao fazer upload'));
    }
  };

  return (
    <Container>
      <Header title="Upload do comprovante" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" active onPress={handleUpload} />

        <Progress>{progress}%</Progress>

        <Transferred>{bytesTransferred}</Transferred>
      </Content>
      {progress != '0' && (
        <ProgressContainer>
          <ProgressBar style={{ width: Number(progress) + '%' }}></ProgressBar>
        </ProgressContainer>
      )}
    </Container>
  );
}
