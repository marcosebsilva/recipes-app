import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';

export default function Login() {
  const {
    handleEmailChange,
    handlePasswordChange,
    email,
    password,
  } = useContext(recipesContext);

  const history = useHistory();
  function validateLogin() {
    const REGEX = /\S+@\S+\.\S+/;
    const SIX = 6;
    if (password.length > SIX && REGEX.test(email)) {
      return true;
    }
  }

  function handleSubmit() {
    const dataUser = {
      email,
    };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(dataUser));
    history.push('/comidas');
  }

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email-input">
        <input
          type="email"
          data-testid="email-input"
          onChange={ handleEmailChange }
          value={ email }
          name="email"
        />
      </label>
      <label htmlFor="password-input">
        <input
          type="password"
          data-testid="password-input"
          onChange={ handlePasswordChange }
          value={ password }
          name="password"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        id="login-button"
        disabled={ !validateLogin() }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </div>
  );
}
