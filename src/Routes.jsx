import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
