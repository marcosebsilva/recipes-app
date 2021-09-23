import PropTypes from 'prop-types';
import React, { useState } from 'react';
import recipesContext from '../context/recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange({ target }) {
    setEmail(target.value);
  }

  function handlePasswordChange({ target }) {
    setPassword(target.value);
  }

  const obj = {
    handleEmailChange,
    handlePasswordChange,
    email,
    password,
  };

  return (
    <Provider value={ { obj } }>
      { children }
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
