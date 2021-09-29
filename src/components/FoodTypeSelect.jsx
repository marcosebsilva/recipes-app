import PropTypes from 'prop-types';
import React from 'react';

function FoodTypeSelect(props) {
  const { updateFiltered } = props;

  const typeClick = (e) => {
    const { name } = e.target;
    updateFiltered(name);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="todos"
        onClick={ typeClick }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="comida"
        onClick={ typeClick }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="bebida"
        onClick={ typeClick }
      >
        Drinks
      </button>
    </div>
  );
}

FoodTypeSelect.propTypes = {
  updateFiltered: PropTypes.func.isRequired,
};

export default FoodTypeSelect;
