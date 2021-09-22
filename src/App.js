import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './provider/RecipesProvider';
import Login from './components/Login';
import Comidas from './components/Comidas';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
