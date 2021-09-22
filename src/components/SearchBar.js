import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RadioInput from './RadioInput';
import MockMainScreen from './MockMainScreen';

export default function SearchBar({ location }) {
  const history = useHistory();
  const [searchText, setSearchText] = useState();
  const [selectedRadio, setSelectedRadio] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [renderButton, setRenderButton] = useState(false);
  const [api, setApi] = useState();

  const buttonDisabled = selectedRadio === undefined || searchText === undefined;
  const dataReady = filteredData !== null;

  // set api link
  useEffect(() => {
    const currentPage = location.pathname;
    if (currentPage === '/bebidas') {
      setApi('thecocktaildb');
    } else if (currentPage === '/comidas') {
      setApi('themealdb');
    }
  }, [location]);

  const handleChange = ({ target }) => {
    if (target.name === 'radio-option') {
      setSelectedRadio(target.value);
    } else {
      setSearchText(target.value);
    }
  };

  async function callAPI() {
    if (selectedRadio === 'first-letter' && searchText.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
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
      setFilteredData(recipes);
    } catch (err) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }
  return (
    <>
      <button
        onClick={ () => setRenderButton(!renderButton) }
        data-testid="search-top-btn"
        type="button"
      >
        Toggle
      </button>
      { renderButton && (
        <form>
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
      {dataReady && <MockMainScreen data={ filteredData } /> }
    </>
  );
}

SearchBar.propTypes = {
  location: PropTypes.objectOf(String).isRequired,
};
