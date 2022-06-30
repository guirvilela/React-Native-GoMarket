import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [urlImage, setUrlImage] = useState<string>('');
  const [photoInfo, setPhotoInfo] = useState<string>('');

  useEffect(() => {
    storage()
      .ref('images')
      .list()
      .then((result) => {
        const files: FileProps[] = [];

        result.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          });
        });

        setPhotos(files);
      });
  });

  const handleShowImage = async (path: string) => {
    const urlImage = await storage().ref(path).getDownloadURL();
    setUrlImage(urlImage);

    const info = await storage().ref(path).getMetadata();

    setPhotoInfo(
      `Upload realizado em ${moment(info.timeCreated).format('DD/MM/YYYY')}`,
    );
  };

  const handleDeleteImage = async (path: string) => {
    Alert.alert(
      'Deletar Comprovante',
      'Você tem certeza que deseja deletar este comprovante?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            return storage().ref(path).delete();
          },
        },
      ],
    );
  };

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={urlImage} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
