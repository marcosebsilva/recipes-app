import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import shareBtn from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteCard(props) {
  const { filtered, deleteFavorite } = props;
  const history = useHistory();

  const topTexHelper = (recipe) => {
    if (recipe.type === 'comida') {
      return `${recipe.area} - ${recipe.category}`;
    }
    return 'Alcoholic';
  };

  const shareHandler = (recipe) => {
    const link = `localhost:3000/${recipe.type}s/${recipe.id}`;
    global.alert('Link copiado!');
    navigator.clipboard.writeText(link);
  };

  const clickRedirect = (recipe) => {
    console.log(recipe);
    history.push(`/${recipe.type}s/${recipe.id}`);
  };

  // const unfavoriteHandler = (id) => {
  //   const filteredById = favorites.filter((recipe) => recipe.id !== id);
  //   console.log(recipes, filteredById);
  //   setFavorites(filtered);
  //   updateFiltered();
  //   // localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
  // };

  return (
    <>
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
            <img
              src={ shareBtn }
              alt="Share button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => shareHandler(recipe) }
              aria-hidden="true"
            />
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
  filtered: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteCard;
