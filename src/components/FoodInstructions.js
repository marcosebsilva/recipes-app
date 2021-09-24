import React from 'react';
import PropTypes from 'prop-types';

export default function FoodInstructions({ ingredients, instructions }) {
  return (
    <>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            { ingredient }
          </li>))}
      </ol>
      <p data-testid="instructions">{instructions}</p>
    </>
  );
}

FoodInstructions.propTypes = {
  ingredients: PropTypes.arrayOf(String),
  instructions: PropTypes.string,
}.isRequired;
