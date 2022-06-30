import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';
import { Search } from '../Search';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      .orderBy('quantity')
      .onSnapshot((querySnapshot) => {
        const dataProducts = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(dataProducts);
      });

    return () => subscribe();
  }, []);

  const searchProducts = (product: string) => {
    if (!product) {
      firestore()
        .collection('products')
        .get()
        .then((response) => {
          const dataProducts = response.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as ProductProps[];
          setProducts(dataProducts);
        });
    } else {
      firestore()
        .collection('products')
        .where('description', '==', product)
        .get()
        .then((response) => {
          const dataProducts = response.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as ProductProps[];
          setProducts(dataProducts);
        });
    }
  };

  return (
    <>
      <Search handleSearch={(value) => searchProducts(value)} loading={false} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Product data={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.content}
      />
    </>
  );
}
