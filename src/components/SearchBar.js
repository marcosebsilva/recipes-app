import React, { useState } from 'react';
import RadioInput from './RadioInput';

export default function SearchBar(){
  const [searchText, setSearchText] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const [renderedElement, setRenderedElement] = useState({});

  const handleChange = ({target}) => {
    console.log(target.name)
    if(target.name === "selected-radio"){
      setSearchRadio(target.value);
    } else {
      setSearchText(target.value);
    }
  }

  async function callAPI(){
    let url = ``;

    //linha 21 ate 34 vai ser refatorada eventualmente;
    switch(searchRadio){
    case 'name':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      break;
    case 'ingredient':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`
      break;
    case 'first-letter':
      if(searchText.length > 1){
        alert('Sua busca deve conter somente 1 (um) caracter')
        return;
      }
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`
      break;
    default:
    }
    const response = await fetch(url).then((res) => res.json());
    setRenderedElement({response});
}

  return(
    <form>  
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <section onChange={ handleChange } name="radio-inputs">
        <RadioInput field="ingredient" text="Ingredientes"/>
        <RadioInput field="name" text="Nome"/>
        <RadioInput field="first-letter" text="Primeira letra"/>
      </section>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ ()=> callAPI() }
      >
        Procurar
      </button>
    </form>
  );
}