import React from 'react';
import { useHistory } from 'react-router-dom';

function MapContent({ item, divClick, page }) {
  const TWELVE = 12;
  const { push } = useHistory();

  if (page === 'food') {
    return (
      <main className="main">
        {item.filter((e, index) => index < TWELVE)
          .map(({ idMeal, strMealThumb, strMeal, strCategory }, index) => (
            <button
              type="button"
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
              onClick={ () => divClick(idMeal, 'food', push) }
              aria-hidden="true"
            >
              <img
                className="recipe-card__image"
                data-testid={ `${index}-card-img` }
                style={ { width: '340px' } }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <h3
                className="recipe-card__title"
                data-testid={ `${index}-card-name` }
              >
                {strMeal}
              </h3>
              { strCategory && (
                <p className="recipe-card__category">
                  {strCategory}
                </p>) }
            </button>))}
      </main>
    );
  }

  if (page === 'drink') {
    return (
      <main className="main">
        {item.filter((e, index) => index < TWELVE)
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          
            <button
              type="button"
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
              onClick={ () => divClick(idDrink, 'drink', push) }
              aria-hidden="true"
            >
              <img
                className="recipe-card__image"
                data-testid={ `${index}-card-img` }
                style={ { width: '340px' } }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <h3
                data-testid={ `${index}-card-name` }
                className="recipe-card__title"
              >
                {strDrink}
              </h3>
            </button>))}
      </main>
    );
  }
}

export default MapContent;
