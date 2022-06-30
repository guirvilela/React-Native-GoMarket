import React, { useState } from 'react';

import { ButtonIcon } from '../ButtonIcon';
import { Container } from './styles';
import { Input } from '../Input';

export type SearchProps = {
  handleSearch: (text: string) => void;
  loading: boolean;
};

export function Search({ handleSearch, loading }: SearchProps) {
  const [search, setSearch] = useState<string>('');

  return (
    <Container>
      <Input
        placeholder="Pesquisar"
        size="medium"
        onChangeText={setSearch}
        value={search}
      />

      <ButtonIcon
        size="large"
        icon="search"
        onPress={() => handleSearch(search)}
        isLoading={loading}
      />
    </Container>
  );
}
