import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';

// import Bebidas from './pages/Bebidas';
// import ComidasDetails from './pages/ComidasDetails';
// import BebidasDetails from './pages/BebidasDetails';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" />
        <Route exact path="/bebidas/:id" />
        <Route exact path="/comidas/:id/in-progress" />
        <Route exact path="/bebidas/:id/in-progress" />
        <Route exact path="/explorar" />
        <Route exact path="/explorar/comidas" />
        <Route exact path="/explorar/bebidas" />
        <Route exact path="/explorar/comidas/ingredientes" />
        <Route exact path="/explorar/bebidas/ingredientes" />
        <Route exact path="/explorar/comidas/area" />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" />
        <Route exact path="/receitas-favoritas" />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
