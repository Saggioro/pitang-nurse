import React from 'react';

import Page from '../../components/Page';
import { useAuth } from '../../hooks/auth';
import ListView from '../../components/ListView';

const UserDashboard = () => {
  const { name } = useAuth();

  return (
    <Page title="Área do Usuário" logOut>
      Bem vindo, {name}!
      <ListView />
    </Page>
  );
};

export default UserDashboard;
