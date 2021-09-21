import React, { useState } from 'react';
import RadioInput from './RadioInput';

export default function SearchBar(){
  const [searchText, setSearchText] = useState('');

  const handleChange = ({target}) => {
    setSearchText(target.value);
  }

  return(
    <form>  
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <RadioInput field="ingredient" text="Ingredientes"/>
      <RadioInput field="name" text="Nome"/>
      <RadioInput filed="first-letter" text="Primeira letra"/>
      <button 
        data-testid="exec-search-btn"
      >
        Procurar
      </button>
    </form>
  );
}