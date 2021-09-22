import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './provider/RecipesProvider';
import Login from './components/Login';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
