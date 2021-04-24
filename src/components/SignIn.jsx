import React from 'react';

import { Form, Button, Spinner } from 'react-bootstrap';
import Input from './Input';

const SignIn = ({
  password,
  email,
  onSubmit,
  handleChange,
  errors,
  isLoading,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        id="email"
        as="input"
        type="email"
        placeholder="Insira o email"
        label="Email"
        value={email}
        onChange={handleChange}
        isValid={!errors.email}
        isInvalid={!!errors.email}
        error={errors.email}
      />

      <Input
        id="password"
        type="password"
        placeholder="Insira a senha"
        label="Senha"
        value={password}
        onChange={handleChange}
        isValid={!errors.password}
        isInvalid={!!errors.password}
        error={errors.password}
      />

      <Button disable={isLoading} variant="primary" type="submit">
        {isLoading ? <Spinner size="sm" animation="border" /> : 'Entrar'}
      </Button>
    </Form>
  );
};

export default SignIn;
