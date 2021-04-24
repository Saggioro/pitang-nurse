import React, { useContext, createContext, useState } from 'react';
import jwt from 'jsonwebtoken';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Agendacovid:nurseToken');

    if (token) {
      const decoded = jwt.decode(token);

      const today = new Date();
      const expToken = new Date(decoded.exp * 1000);

      if (today > expToken) {
        localStorage.removeItem('@Agendacovid:nurseToken');
        api.defaults.headers.authorization = '';

        return {};
      }
      const { name, id } = decoded;

      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, name, id };
    }

    return {};
  });

  const signIn = async ({ email, password }) => {
    const response = await api.post('/sessionsNurse', { email, password });

    const { name, id } = jwt.decode(response.data.token);

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;
    localStorage.setItem('@Agendacovid:nurseToken', response.data.token);

    setData({ token: response.data.token, name, id });
  };

  const signOut = () => {
    api.defaults.headers.authorization = '';
    localStorage.removeItem('@Agendacovid:nurseToken');

    setData({});
  };

  return (
    <>
      {data.token ? (
        <AuthContext.Provider
          value={{ name: data.name, id: data.id, signIn, signOut }}
        >
          {children}
        </AuthContext.Provider>
      ) : (
        <AuthContext.Provider value={{ name: '', id: '', signIn, signOut }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
