import PropTypes from 'prop-types';
import React from 'react';
import recipesContext from '../context/recipesContext';

function RecipesProvider({ children }) {
  const { Provider } = recipesContext;

  const obj = {

  };

  return (
    <Provider value={ obj }>
      { children }
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
