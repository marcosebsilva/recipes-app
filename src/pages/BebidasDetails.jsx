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

function BebidasDetails({ match: { params: { id } } }) {
  const {
    foodData,
    arrDrinkId,
    filterById,
  } = useContext(recipesContext);
  const [showMessage, setShowMessage] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [textButton, setTextButton] = useState();

  const { push } = useHistory();
  function initRecipe(drinkId) {
    push(`/bebidas/${drinkId}/in-progress`);
  }

  useEffect(() => {
    filterById(id, 'drink');
    CheckFavoriteDetails(id, setIsFavorite);
    ButtonRecipeFunc(id, setTextButton, 'drink');
  }, [id, filterById]);

  if (!arrDrinkId || !foodData) {
    return <p>Loading...</p>;
  }
  const {
    strDrink,
    strInstructions,
    strDrinkThumb,
    strAlcoholic,
    strCategory,
    idDrink,
  } = arrDrinkId[0];

  function copyLink(drinkId) {
    copy(`http://localhost:3000/bebidas/${drinkId}`);
    setShowMessage(true);

    const ONE_SECOND = 1000;

    setTimeout(() => {
      setShowMessage(false);
    }, ONE_SECOND);
  }

  const clickFavoriteButton = (drinkId) => {
    const favoritesStorage = localStorage.getItem('favoriteRecipes');

    if (isFavorite) {
      const favoritesObject = JSON.parse(favoritesStorage);

      const newFavoritesObject = favoritesObject
        .filter((favoriteObject) => favoriteObject.id !== drinkId);

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesObject));
      setIsFavorite(!isFavorite);
      return;
    }

    const favoriteDrink = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    const favoritesObject = JSON.parse(favoritesStorage);
    const newFavoritesObject = [...favoritesObject, favoriteDrink];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesObject));
    setIsFavorite(true);
  };

  return (
    <div className="main-details">
      <section className="details-card">
        <img
          className="details-card__image"
          data-testid="recipe-photo"
          style={ { width: '340px' } }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <section>
          <h3 data-testid="recipe-title" className="details-card__title">{strDrink}</h3>
          <p
            data-testid="recipe-category"
            className="details-card__subtitle"
          >
            {strAlcoholic}
          </p>
        </section>
        <section className="details-card__buttons">
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? favotiteHeartIcon : heartIcon }
            alt="Favoritar"
            onClick={ () => clickFavoriteButton(id) }
            aria-hidden
          />
          <img
            aria-hidden
            data-testid="share-btn"
            src={ shareIcon }
            alt="Compartilhar"
            onClick={ () => copyLink(id) }
          />
        </section>
      </section>
      {showMessage && <div className="copied-link">Link copiado!</div>}
      <section className="main details-body">
        <h2 className="details-body__ingredientes-title">Ingredientes</h2>
        <MapDetails arr={ arrDrinkId } />
        <h2 className="details-body__recipe-title">Modo de preparo</h2>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      <h2 className="details-body__recomendation-title">Experimente também!</h2>
      <MapRecomendation item={ foodData } page="drink" />
      <button
        className="details-body__start"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => initRecipe(id) }
      >
        {textButton}
      </button>
    </div>
  );
}

BebidasDetails.propTypes = {
  match: PropTypes.shape(PropTypes.shape({})).isRequired,
};

export default BebidasDetails;
