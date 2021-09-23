import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  return (
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
      <SearchBar />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
