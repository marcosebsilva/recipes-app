import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FoodCard({ recipe, foodType }) {
  const [isFavorite, setIsFavorite] = useState();
  const [showMessage, setShowMessage] = useState();

  const clickFavoriteButton = () => {
    const favoritesStorage = localStorage.getItem('favoriteRecipes');

    if (isFavorite) {
      const favoritesObject = JSON.parse(favoritesStorage);

      const newFavoritesObject = favoritesObject
        .filter((favoriteObject) => favoriteObject.id !== recipe[`id${foodType}`]);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesObject));
      setIsFavorite(!isFavorite);
      return;
    }

    const favoriteFood = foodType === 'Drink'
      ? {
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }
      : {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };

    const favoritesObject = JSON.parse(favoritesStorage);
    const newFavoritesObject = [...favoritesObject, favoriteFood];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesObject));
    setIsFavorite(true);
  };
  const copyLink = () => {
    const link = foodType === 'Drink'
      ? 'bebidas'
      : 'comidas';
    copy(`http://localhost:3000/${link}/${recipe[`id${foodType}`]}`);
    setShowMessage(true);

    const ONE_SECOND = 1000;

    setTimeout(() => {
      setShowMessage(false);
    }, ONE_SECOND);
  };
  const checkFavoriteHook = useCallback(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      const recipeIsFavorite = favoriteRecipes
        .some((favoriteRecipe) => recipe[`id${foodType}`] === favoriteRecipe.id);

      if (recipeIsFavorite) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
      return;
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }, [foodType, recipe]);

  useEffect(() => {
    checkFavoriteHook();
  }, [checkFavoriteHook]);

  return (
    <div className="in-progress-card">
      <img
        className="food-photo in-progress-card__image"
        style={ { width: '340px' } }
        alt="food"
        data-testid="recipe-photo"
        src={ recipe[`str${foodType}Thumb`] }
      />
      <section className="test">
        <h3
        // bad solution to avoid lint problem, instead of declaring a independent class
          className="details-card__title"
          data-testid="recipe-title"
        >
          {recipe[`str${foodType}`]}
        </h3>
        <p
        // same as line 96
          className="details-card__subtitle"
          data-testid="recipe-category"
        >
          {recipe.strCategory}
        </p>
      </section>
      <div className="in-progress-card__buttons">
        <img
          data-testid="favorite-btn"
          alt="Favorite icon"
          onClick={ clickFavoriteButton }
          src={ isFavorite ? favoriteIcon : notFavoriteIcon }
          aria-hidden
        />
        <img
          aria-hidden
          data-testid="share-btn"
          alt="Share icon"
          onClick={ copyLink }
          src={ shareIcon }
        />
      </div>
      {showMessage && <p>Link copiado!</p>}
    </div>
  );
}

FoodCard.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  foodType: PropTypes.string.isRequired,
};
