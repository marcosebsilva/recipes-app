import React from 'react';
import PropTypes from 'prop-types';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FoodCard({ recipe, foodType }) {
  return (
    <div>
      <img
        className="food-photo"
        alt="food"
        data-testid="recipe-photo"
        src={ recipe[`str${foodType}Thumb`] }
      />
      <h2
        data-testid="recipe-title"
      >
        {recipe[`str${foodType}`]}
      </h2>
      <h3
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </h3>
      <img
        data-testid="favorite-btn"
        alt="Favorite icon"
        src={ favoriteIcon }
        aria-hidden
        onClick={ () => alert('Favorito vem aqui') }
      />
      <img
        onClick={ () => alert('Compartilhar vem aqui') }
        aria-hidden
        data-testid="share-btn"
        alt="Share icon"
        src={ shareIcon }
      />
    </div>
  );
}

FoodCard.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  foodType: PropTypes.string.isRequired,
};
