import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Spinner, Button } from 'react-bootstrap';
import Input from '../../components/Input';
import Page from '../../components/Page';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

const UserLogin = () => {
  // eslint-disable-next-line camelcase
  const { id: nurse_id } = useAuth();
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const validate = values => {
    const errors = {};

    if (!values.status) {
      errors.status = 'Obrigatório*';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      note: '',
      status: '',
    },
    validate,
    onSubmit: async values => {
      setLoading(true);
      try {
        await api.put('/appointments/provide', { ...values, id, nurse_id });
        toast.success('Atendimento realizado com sucesso');
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
    <Page title="Atendimento" logOut>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          id="status"
          as="select"
          type="select"
          placeholder="Insira o email"
          label="Status:"
          value={formik.values.status}
          onChange={formik.handleChange}
          isValid={!formik.errors.status}
          isInvalid={!!formik.errors.status}
          error={formik.errors.status}
        >
          <option value="">Escolha um status</option>
          <option value="done">Compareceu</option>
          <option value="canceled">Cancelado</option>
        </Input>

        <Input
          id="note"
          as="textarea"
          type="text"
          placeholder="Insira uma observação para este atendimento"
          label="Observação"
          value={formik.values.note}
          onChange={formik.handleChange}
        />

        <Button disable={loading} variant="primary" type="submit">
          {loading ? <Spinner size="sm" animation="border" /> : 'Entrar'}
        </Button>
      </Form>
    </Page>
  );
};
export default UserLogin;
