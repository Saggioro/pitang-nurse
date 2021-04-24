import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Attend from '../pages/Attend';

export const routes = [
  {
    name: 'Login',
    path: '/',
    component: Login,
    isPrivate: false,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  {
    name: 'Atendimento',
    path: '/attend/:id',
    component: Attend,
    isPrivate: true,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ component, path, isPrivate }) => {
        return (
          <Route
            exact
            key={path}
            path={path}
            component={component}
            isPrivate={isPrivate}
          />
        );
      })}
    </Switch>
  );
};

export default Routes;
