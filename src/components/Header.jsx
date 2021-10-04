import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, searchBar }) {
  return (
    <header className="header">
      <Link to="/perfil">
        <button
          type="button"
          className="header__profile-icon"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </button>
      </Link>
      <h1
        data-testid="page-title"
        className="header__title"
      >
        { title }
      </h1>
      { searchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool,
}.isRequired;
