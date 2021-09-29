import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Perfil() {
  const email = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  function handleDoneRecipes() {
    history.push('/receitas-feitas');
  }

  function handleFavoriteRecipes() {
    history.push('/receitas-favoritas');
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">
        {Object.values((!email) ? 'email@email.com' : email)}
      </h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipes }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteRecipes }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
