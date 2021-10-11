import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function FoodInstructions({ ingredients, recipe, foodType }) {
  const [inLocalStorage, setInLocalStorage] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const history = useHistory();

  console.log(recipe);

  const { strInstructions } = recipe;

  const foodID = recipe[`id${foodType}`];
  const localStorageKey = foodType === 'Drink' ? 'cocktails' : 'meals';

  function enableButton() {
    const checkedElements = Array.from(
      document.querySelectorAll('input[type=checkbox]:checked'),
    );
    setDisableButton(checkedElements.length !== ingredients.length);
  }

  function updateLocalStorage() {
    const checked = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
      .map((element) => element.value);

    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const newStorage = {
      ...prevStorage,
      [localStorageKey]: {
        ...prevStorage[localStorageKey],
        [foodID]: checked,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...newStorage }));

    enableButton();
  }

  const checkStorageHook = useCallback((storage) => {
    if (storage[localStorageKey][foodID]) {
      setInLocalStorage(storage[localStorageKey][foodID]);
    } else {
      setInLocalStorage([]);
    }
  }, [localStorageKey, foodID]);

  useEffect(() => {
    const localStorageObject = localStorage.getItem('inProgressRecipes');
    if (localStorageObject) {
      checkStorageHook(JSON.parse(localStorageObject));
    } else {
      const newStorage = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      setInLocalStorage([]);
    }
  }, [localStorageKey, foodID, checkStorageHook]);

  function clickHandler() {
    const local = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const date = new Date();
    const newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    const done = foodType === 'Drink'
      ? {
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: newDate,
        tags: [''],
      }
      : {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: newDate,
        tags: recipe.strTags.split(','),
      };
    const doneRecipes = [...local, done];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    history.push('/receitas-feitas');
  }

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
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disableButton }
        onClick={ clickHandler }
      >
        Finalizar receita
      </button>
    </>
  ) : <p>Loading</p>;
}

FoodInstructions.propTypes = {
  ingredients: PropTypes.arrayOf(String),
  instructions: PropTypes.string,
}.isRequired;
