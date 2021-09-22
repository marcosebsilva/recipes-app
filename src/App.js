import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './provider/RecipesProvider';
import Login from './components/Login';
<<<<<<< HEAD
import Comidas from './components/Comidas';
=======
>>>>>>> 568bd2dd592ebba187c7774711aaeddfddb9eacf

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
<<<<<<< HEAD
        <Route path="/comidas" component={ Comidas } />
=======
>>>>>>> 568bd2dd592ebba187c7774711aaeddfddb9eacf
      </Switch>
    </RecipesProvider>
  );
}

export default App;
