import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import MapDetails from '../components/MapDetails';
import MapRecomendation from '../components/MapRecomendation';

function BebidasDetails({ match: { params: { id } } }) {
  const {
    foodData,
    arrDrinkId,
    filterById,
  } = useContext(recipesContext);

  useEffect(() => {
    filterById(id, 'drink');
  }, [id, filterById]);

  if (!arrDrinkId || !foodData) {
    return <p>Loading...</p>;
  }
  const {
    strDrink,
    strInstructions,
    strDrinkThumb,
    strAlcoholic,
  } = arrDrinkId[0];

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          style={ { width: '340px' } }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <h3 data-testid="recipe-title">{strDrink}</h3>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
        <img data-testid="favorite-btn" src={ heartIcon } alt="Favoritar" />
        <MapDetails arr={ arrDrinkId } />
        <p data-testid="instructions">{strInstructions}</p>
        <MapRecomendation item={ foodData } page="drink" />
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

BebidasDetails.propTypes = {
  match: PropTypes.shape(PropTypes.shape({})).isRequired,
};

export default BebidasDetails;
