import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './provider/RecipesProvider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <RecipesProvider>
      <p>Inimigos do Redux</p>
      <SearchBar />
    </RecipesProvider>
  );
}

export default App;
