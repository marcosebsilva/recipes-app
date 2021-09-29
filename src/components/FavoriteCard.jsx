import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import shareBtn from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteCard(props) {
  const { filtered, deleteFavorite } = props;
  const history = useHistory();
  const [msgShow, setMsgShow] = useState(false);

  const topTexHelper = (recipe) => {
    if (recipe.type === 'comida') {
      return `${recipe.area} - ${recipe.category}`;
    }
    return 'Alcoholic';
  };

  const shareHandler = (recipe) => {
    const link = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    const ONE_SECOND = 1000;

    copy(link);
    setMsgShow(true);
    setTimeout(() => {
      setMsgShow(false);
    }, ONE_SECOND);
  };

  const clickRedirect = (recipe) => {
    history.push(`/${recipe.type}s/${recipe.id}`);
  };

  return (
    <>
      {msgShow && <span>Link copiado!</span>}
      {filtered.map((recipe, index) => {
        const title = topTexHelper(recipe);
        return (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              className="recipe-image"
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => clickRedirect(recipe) }
              aria-hidden="true"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{title}</p>
            <p
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => clickRedirect(recipe) }
              aria-hidden="true"
            >
              {recipe.name}
            </p>
            <button type="button" onClick={ () => shareHandler(recipe) }>
              <img
                src={ shareBtn }
                alt="Share button"
                data-testid={ `${index}-horizontal-share-btn` }
                aria-hidden="true"
              />
            </button>
            <img
              src={ blackHeart }
              alt="Favorite button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => deleteFavorite(recipe.id) }
              aria-hidden="true"
            />
          </div>
        );
      })}
    </>
  );
}

FavoriteCard.propTypes = {
  deleteFavorite: PropTypes.func.isRequired,
  filtered: PropTypes.arrayOf(Object).isRequired,
};

export default FavoriteCard;
