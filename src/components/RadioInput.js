import React from 'react';
import PropTypes from 'prop-types';

export default function RadioInput({ field, text }) {
  return (
    <label htmlFor={ field }>
      { text }
      <input
        value={ field }
        type="radio"
        name="radio-option"
        id={ field }
        data-testid={ `${field}-search-radio` }
      />
    </label>
  );
}

RadioInput.propTypes = {
  field: PropTypes.string,
  text: PropTypes.string,
}.isRequired;
