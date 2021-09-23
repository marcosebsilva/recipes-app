import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title, noSearchButton }) => {
  const [searchBar, setShowBar] = useState(false);
  const [searchInput, setInput] = useState('');
  const [searchRadio, setRadio] = useState('');
  const [searchButton, setButton] = useState('');
  console.log(searchRadio);
  console.log(searchButton);
  console.log(setButton);
  const showSearch = () => (searchBar ? setShowBar(false) : setShowBar(true));

  const handleChange = ({ target }) => {
    const { value, name } = target;
    return name === 'searchInput' ? setInput(value) : setRadio(value);
  };

  const buttonFunc = () => {
  };

  if (noSearchButton) {
    return (
      <>
        <div>
          <Link to="/perfil">
            <button
              type="button"
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Profile Icon"
              />
            </button>
          </Link>
          <div>
            <h1
              data-testid="page-title"
            >
              { title }
            </h1>
          </div>
        </div>
        {
          searchBar
            ? (
              <div>
                <input
                  type="text"
                  id="searchBar"
                  data-testid="search-input"
                  name="searchInput"
                  value={ searchInput }
                  placeholder="Pesquise aqui o que você quer comer"
                  onChange={ handleChange }
                  required={ false }
                />
                <div>
                  <input
                    labelText="Ingrediente"
                    type="radio"
                    data-testid="ingredient-search-radio"
                    name="ingredient"
                    value="ingredient"
                    onChange={ handleChange }
                  />
                  <input
                    labelText="Nome"
                    type="radio"
                    data-testid="name-search-radio"
                    name="name"
                    value="name"
                    onChange={ handleChange }
                  />
                  <input
                    labelText="Primeira letra"
                    type="radio"
                    data-testid="first-letter-search-radio"
                    name="firstLetter"
                    value="firstLetter"
                    onChange={ handleChange }
                  />
                  <button
                    type="button"
                    data-testid="exec-search-btn"
                    onClick={ buttonFunc }
                  >
                    PESQUISAR
                  </button>
                </div>
              </div>)
            : ''
        }
      </>
    );
  }

  return (
    <>
      <div>
        <Link to="/perfil">
          <button
            type="button"
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </button>
        </Link>
        <div>
          <h1
            data-testid="page-title"
          >
            { title }
          </h1>
        </div>

        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ showSearch }
          src={ searchIcon }
        >
          <img
            src={ searchIcon }
            alt="Profile Icon"
          />
        </button>
      </div>
      {

        searchBar
          ? (
            <div
              data-testid="search-input"
            >
              <input
                type="text"
                data-testid="search-input"
                name="searchInput"
                value={ searchInput }
                placeholder="Pesquise aqui o que você deseja comer"
                onChange={ handleChange }
                required={ false }
              />
              <div>
                <input
                  labelText="Ingrediente"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  name="ingredient"
                  value="ingredient"
                  onChange={ handleChange }
                />
                <input
                  labelText="Nome"
                  type="radio"
                  data-testid="name-search-radio"
                  name="name"
                  value="name"
                  onChange={ handleChange }
                />
                <input
                  labelText="Primeira letra"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="firstLetter"
                  value="firstLetter"
                  onChange={ handleChange }
                />
              </div>
              <div>
                <button
                  type="button"
                  data-testid="exec-search-btn"
                  onClick={ buttonFunc }
                >
                  PESQUISAR
                </button>
              </div>
            </div>)
          : ''
      }
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  noSearchButton: PropTypes.string.isRequired,
};

export default Header;
