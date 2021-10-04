import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RadioInput from './RadioInput';
import searchIcon from '../images/searchIcon.svg';
import recipesContext from '../context/recipesContext';

export default function SearchBar() {
  const {
    setArrFilteredFood,
    setArrFilteredDrink,
    searchText,
    setSearchText,
    selectedRadio,
    setSelectedRadio,
    renderButton,
    setRenderButton,
    api,
    setApi,
  } = useContext(recipesContext);
  const location = useLocation();
  const history = useHistory();

  const buttonDisabled = selectedRadio === undefined || searchText === undefined;

  // set api link
  useEffect(() => {
    const currentPage = location.pathname;
    if (currentPage === '/bebidas') {
      setApi('thecocktaildb');
    } else if (currentPage === '/comidas') {
      setApi('themealdb');
    }
  }, [location, setApi]);

  const handleChange = ({ target }) => {
    if (target.name === 'radio-option') {
      setSelectedRadio(target.value);
    } else {
      setSearchText(target.value);
    }
  };

  async function callAPI() {
    if (selectedRadio === 'first-letter' && searchText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    const filterBy = {
      name: `https://www.${api}.com/api/json/v1/1/search.php?s=${searchText}`,
      ingredient: `https://www.${api}.com/api/json/v1/1/filter.php?i=${searchText}`,
      'first-letter': `https://www.${api}.com/api/json/v1/1/search.php?f=${searchText}`,
    };

    const url = filterBy[selectedRadio];

    const response = await fetch(url);

    try {
      const obj = await response.json();
      const recipes = Object.values(obj)[0];
      const foodType = location.pathname === '/bebidas'
        ? 'Drink'
        : 'Meal';
      if (recipes === null) {
        throw new Error();
      }
      // probably set context
      if (recipes.length === 1) {
        const foodID = recipes[0][`id${foodType}`];
        history.push(`${location.pathname}/${foodID}`);
        return;
      }
      if (foodType === 'Meal') {
        const { meals } = obj;
        setArrFilteredFood(meals);
      }

      if (foodType === 'Drink') {
        const { drinks } = obj;
        setArrFilteredDrink(drinks);
      }
    } catch (err) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }
  return (
    <>
      <img
        onClick={ () => setRenderButton(!renderButton) }
        data-testid="search-top-btn"
        aria-hidden
        src={ searchIcon }
        alt="search icon"
      />
      { renderButton && (
        <form className="search-bar">
          <input
            type="text"
            data-testid="search-input"
            onChange={ handleChange }
          />
          <section onChange={ handleChange } name="radio-inputs">
            <RadioInput field="ingredient" text="Ingredientes" />
            <RadioInput field="name" text="Nome" />
            <RadioInput field="first-letter" text="Primeira letra" />
          </section>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ callAPI }
            disabled={ buttonDisabled }
          >
            Procurar
          </button>
        </form>
      )}
    </>
  );
}
