import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import EmProgresso from './pages/EmProgresso';
import Perfil from './pages/Perfil';
import ComidasDetails from './pages/ComidasDetails';
import BebidasDetails from './pages/BebidasDetails';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComida';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidasLocal from './pages/ExplorarComidasLocal';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ ComidasDetails } />
        <Route exact path="/bebidas/:id" component={ BebidasDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ EmProgresso } />
        <Route exact path="/bebidas/:id/in-progress" component={ EmProgresso } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasLocal } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
