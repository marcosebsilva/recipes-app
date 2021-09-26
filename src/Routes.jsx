import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
<<<<<<< HEAD
import Explore from './pages/Explore';

// import Bebidas from './pages/Bebidas';
// import ComidasDetails from './pages/ComidasDetails';
// import BebidasDetails from './pages/BebidasDetails';
=======
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
>>>>>>> 34f5ef9a0fdd05107f8e6a1093c35ae0423a1c9c

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
<<<<<<< HEAD
        <Route exact path="/comidas/:id" />
        <Route exact path="/bebidas/:id" />
        <Route exact path="/comidas/:id/in-progress" />
        <Route exact path="/bebidas/:id/in-progress" />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" />
        <Route exact path="/explorar/bebidas" />
        <Route exact path="/explorar/comidas/ingredientes" />
        <Route exact path="/explorar/bebidas/ingredientes" />
        <Route exact path="/explorar/comidas/area" />
        <Route exact path="/perfil" />
        <Route exact path="/receitas-feitas" />
        <Route exact path="/receitas-favoritas" />
=======
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
>>>>>>> 34f5ef9a0fdd05107f8e6a1093c35ae0423a1c9c
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
