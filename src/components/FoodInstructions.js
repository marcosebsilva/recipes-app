import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function FoodInstructions({ ingredients, recipe, foodType }) {
  const [inLocalStorage, setInLocalStorage] = useState();

  const { strInstructions } = recipe;

  const foodID = recipe[`id${foodType}`];
  const localStorageKey = foodType === 'Drink' ? 'cocktails' : 'meals';

  function updateLocalStorage() {
    const checked = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
      .map((element) => element.value);

    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    prevStorage[localStorageKey][foodID] = checked;

    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...prevStorage }));
  }

  useEffect(() => {
    const localStorageObject = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const foodKey = localStorageObject[localStorageKey][foodID];

    if (foodKey) {
      setInLocalStorage(foodKey);
    } else {
      const newStorage = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      setInLocalStorage([]);
    }
  }, [localStorageKey, foodID]);

  return inLocalStorage ? (
    <>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li
            aria-hidden
            onClick={ updateLocalStorage }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ `${ingredient}` }>
              { ingredient }
              <input
                type="checkbox"
                value={ ingredient }
                id={ ingredient }
                defaultChecked={ inLocalStorage.includes(ingredient) }
              />
            </label>
          </li>))}
      </ol>
      <p data-testid="instructions">{ strInstructions }</p>
    </>
  ) : <p>Loading</p>;
}

FoodInstructions.propTypes = {
  ingredients: PropTypes.arrayOf(String),
  instructions: PropTypes.string,
}.isRequired;
