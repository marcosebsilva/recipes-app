import React from 'react';
import '../style/mapRecomendation.css';

function MapRecomendation({ item, page }) {
  const SIX = 6;

  if (page === 'food') {
    return (
      <div className="recomendation">
        {item.filter((e, index) => index < SIX)
          .map(({ strDrinkThumb, strDrink }, index) => (
            <div
              className="recomendation-card"
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img
                data-testid={ `${index}-card-img` }
                style={ { width: '175px' } }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <p data-testid={ `${index}-recomendation-title` }>{strDrink}</p>
            </div>))}
      </div>
    );
  }

  if (page === 'drink') {
    return (
      <div className="card-recomendation">
        {item.filter((e, index) => index < SIX)
          .map(({ strMealThumb, strMeal }, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img
                data-testid={ `${index}-card-img` }
                style={ { width: '175px' } }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <p data-testid={ `${index}-recomendation-title` }>{strMeal}</p>
            </div>))}
      </div>
    );
  }
}

export default MapRecomendation;
