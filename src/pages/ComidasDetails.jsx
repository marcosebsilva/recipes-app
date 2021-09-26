import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import MapDetails from '../components/MapDetails';
import MapRecomendation from '../components/MapRecomendation';

function ComidasDetails({ match: { params: { id } } }) {
  const {
    drinkData,
    arrFoodId,
    filterById,
  } = useContext(recipesContext);

  useEffect(() => {
    filterById(id, 'food');
  }, [id, filterById]);

  if (!arrFoodId || !drinkData) {
    return <p>Loading...</p>;
  }
  const {
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
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
        <img data-testid="favorite-btn" src={ heartIcon } alt="Favoritar" />
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
      >
        Iniciar receita
      </button>
    </div>
  );
}

ComidasDetails.propTypes = {
  match: PropTypes.shape(PropTypes.shape({})).isRequired,
};

export default ComidasDetails;
