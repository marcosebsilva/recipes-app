import React, { useState } from 'react';
import RadioInput from './RadioInput';

export default function SearchBar(){
  const [searchText, setSearchText] = useState('');
  const [searchInput, setSearchInput ] = useState('');

  const handleChange = ({target}) => {
    if(target.name === "radio-inputs"){
      setSearchInput(target.value);
    } else {
      setSearchText(target.value);
    }
  }

  // const callAPI = () => {

  // };

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
        data-testid="exec-search-btn"
      >
        Procurar
      </button>
    </form>
  );
}