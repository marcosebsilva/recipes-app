import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import favotiteHeartIcon from '../images/blackHeartIcon.svg';
import MapDetails from '../components/MapDetails';
import MapRecomendation from '../components/MapRecomendation';
import ButtonRecipeFunc from './ButtonRecipeFunc';
import CheckFavoriteDetails from '../components/CheckFavoriteDetails';

function ComidasDetails({ match: { params: { id } } }) {
  const {
    drinkData,
    arrFoodId,
    filterById,
  } = useContext(recipesContext);
  const [showMessage, setShowMessage] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [textButton, setTextButton] = useState();

  const { push } = useHistory();
  function initRecipe(foodId) {
    push(`/comidas/${foodId}/in-progress`);
  }

  useEffect(() => {
    filterById(id, 'food');
    CheckFavoriteDetails(id, setIsFavorite);
    ButtonRecipeFunc(id, setTextButton, 'food');
  }, [id, filterById]);

  if (!arrFoodId || !drinkData) {
    return <p>Loading...</p>;
  }

  const {
    idMeal,
    strArea,
    strMeal,
    strInstructions,
    strMealThumb,
    strYoutube,
    strCategory,
  } = arrFoodId[0];

  const getEmbedVideo = () => {
    if (arrFoodId !== undefined) {
      const codigo = strYoutube.split('v=');
      const linkYoutube = `http://www.youtube.com/embed/${codigo[1]}`;
      return linkYoutube;
    }
  };

  function copyLink(foodId) {
    copy(`http://localhost:3000/comidas/${foodId}`);
    setShowMessage(true);

    const ONE_SECOND = 1000;

    setTimeout(() => {
      setShowMessage(false);
    }, ONE_SECOND);
  }

  const clickFavoriteButton = (foodId) => {
    const favoritesStorage = localStorage.getItem('favoriteRecipes');

    if (isFavorite) {
      const favoritesObject = JSON.parse(favoritesStorage);

      const newFavoritesObject = favoritesObject
        .filter((favoriteObject) => favoriteObject.id !== foodId);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesObject));
      setIsFavorite(!isFavorite);
      return;
    }

    const favoriteFood = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    const favoritesObject = JSON.parse(favoritesStorage);
    const newFavoritesObject = [...favoritesObject, favoriteFood];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesObject));
    setIsFavorite(true);
  };

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          style={ { width: '340px' } }
          src={ strMealThumb }
          alt={ strMeal }
        />
        <h3 data-testid="recipe-title">{strMeal}</h3>
        <p data-testid="recipe-category">{strCategory}</p>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? favotiteHeartIcon : heartIcon }
          alt="Favoritar"
          onClick={ () => clickFavoriteButton(id) }
          aria-hidden
        />
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Compartilhar"
          onClick={ () => copyLink(id) }
          aria-hidden
        />
        {showMessage && <p>Link copiado!</p>}
        <MapDetails arr={ arrFoodId } />
        <p data-testid="instructions">{strInstructions}</p>
        <iframe
          data-testid="video"
          width="340"
          height="180"
          src={ getEmbedVideo() }
          title="YouTube video player"
          frameBorder="0"
        />
        <MapRecomendation item={ drinkData } page="food" />
      </div>
      <button
        data-testid="start-recipe-btn"
        style={ { bottom: '0', position: 'fixed' } }
        type="button"
        onClick={ () => initRecipe(id) }
      >
        {textButton}
      </button>
    </div>
  );
}

ComidasDetails.propTypes = {
  match: PropTypes.shape(PropTypes.shape({})).isRequired,
};

export default ComidasDetails;
