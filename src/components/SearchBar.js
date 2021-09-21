import React, { useEffect, useState } from 'react';
import RadioInput from './RadioInput';

export default function SearchBar() {
  // provavelmente vamos usar isso ao inves de window.location.pathname na linha 24
  // let location = useLocation();
  const [searchText, setSearchText] = useState();
  const [searchRadio, setSearchRadio] = useState();
  // a data filtrada ja vem como um array, eh so renderizar ele na tela principal pra cumprir
  const [filteredData, setFilteredData] = useState([]);
  const buttonDisabled = searchRadio === undefined || searchText === undefined;
  const dataReady = filteredData !== null;

  useEffect(() => {
    if (filteredData === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setFilteredData([]);
    }
  }, [filteredData]);
  const handleChange = ({ target }) => {
    if (target.name === 'selected-radio') {
      setSearchRadio(target.value);
    } else {
      setSearchText(target.value);
    }
  };

  async function callAPI() {
    // esse window provavelmente vai sair
    const currentPage = window.location.pathname === 'bebidas'
      ? 'thecocktaildb' : 'themealdb';
    let url = '';

    switch (searchRadio) {
    case 'name':
      url = `https://www.${currentPage}.com/api/json/v1/1/search.php?s=${searchText}`;
      break;
    case 'ingredient':
      url = `https://www.${currentPage}.com/api/json/v1/1/filter.php?i=${searchText}`;
      break;
    case 'first-letter':
      if (searchText.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      url = `https://www.${currentPage}.com/api/json/v1/1/search.php?f=${searchText}`;
      break;
    default:
    }

    const response = await fetch(url).then((res) => res.json());
    setFilteredData(response.meals);
    // Req 16 depende do Route
    // if(response.meals.length === 1){
    //   history.push(`/${response.meals[0]['idMeal']}`)
    // }
  }

  return (
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

      { dataReady && filteredData.map((meal, index) => (
        <div key={ `meal-${index}` }>{meal.strMeal}</div>))}
    </form>
  );
}
