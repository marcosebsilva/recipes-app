import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './provider/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <p>Inimigos do Redux</p>
    </RecipesProvider>
  );
}

export default App;
