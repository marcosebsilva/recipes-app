import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import RecipesProvider from './provider/RecipesProvider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <RecipesProvider>
      {/* placeholder */}
      <BrowserRouter>
        <Switch>
          <Route path="/comidas" component={ SearchBar } />
          <Route path="/bebidas" component={ SearchBar } />
        </Switch>
      </BrowserRouter>
      {/* placeholder */}
    </RecipesProvider>
  );
}

export default App;
