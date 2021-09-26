import React from 'react';
import { useHistory } from 'react-router-dom';

function MapContent({ item, divClick, page }) {
  const TWELVE = 12;
  const { push } = useHistory();

  if (page === 'food') {
    return (
      <div>
        {item.filter((e, index) => index < TWELVE)
          .map(({ idMeal, strMealThumb, strMeal }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              onClick={ () => divClick(idMeal, 'food', push) }
              aria-hidden="true"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>))}
      </div>
    );
  }

  if (page === 'drink') {
    return (
      <>
        {item.filter((e, index) => index < TWELVE)
          .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              onClick={ () => divClick(idDrink, 'drink', push) }
              aria-hidden="true"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>))}
      </>
    );
  }
}

export default MapContent;
