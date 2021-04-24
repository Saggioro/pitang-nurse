import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Page from '../../components/Page';
import SignIn from '../../components/SignIn';
import { useAuth } from '../../hooks/auth';

const UserLogin = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Obrigatório*';
    }
    if (!values.password) {
      errors.password = 'Obrigatório*';
    } else if (values.password.length < 3) {
      errors.password = 'Precisa ter pelo menos 3 caracteres';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async values => {
      setLoading(true);
      try {
        await signIn(values);

        history.push('/dashboard');
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Parece que temos um problema em nossos servidores :(',
        );
      }
      setLoading(false);
    },
  });

  return (
    <Page title="Login">
      <SignIn
        onSubmit={formik.handleSubmit}
        email={formik.values.email}
        password={formik.values.password}
        handleChange={formik.handleChange}
        errors={formik.errors}
        isLoading={loading}
      />
      <p>Login: teste@email.com</p>
      <p>Senha: 123</p>
      <p>
        Não coloquei cadastro pra esta entidade porque achei que não fazia
        sentido
      </p>
    </Page>
  );
};
export default UserLogin;
