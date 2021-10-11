import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function FoodInstructions({ ingredients, recipe, foodType }) {
  const [inLocalStorage, setInLocalStorage] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const history = useHistory();

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

  return inLocalStorage ? (
    <div className="main details-body">
      <h2 className="details-body__ingredients-title">Ingredientes</h2>
      <ol className="in-progress-body__instructions">
        {ingredients.map((ingredient, index) => (
          <li
            aria-hidden
            onClick={ updateLocalStorage }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ `${ingredient}` }>
              <input
                className="list-item"
                type="checkbox"
                value={ ingredient }
                id={ ingredient }
                defaultChecked={ inLocalStorage.includes(ingredient) }
              />
              <span>{ ingredient }</span>
            </label>
          </li>))}
      </ol>
      <h2 className="details-body__recipe-title">Modo de preparo</h2>
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        className="in-progress__finish"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disableButton }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar receita
      </button>
    </div>
  ) : <p>Loading</p>;
}

FoodInstructions.propTypes = {
  ingredients: PropTypes.arrayOf(String),
  instructions: PropTypes.string,
}.isRequired;
