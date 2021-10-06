import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';

function MapCategories({ item, handleClick, page }) {
  const FIVE = 5;
  const {
    setFoodFilter,
  } = useContext(recipesContext);

  if (page === 'food') {
    return (
      <div className="categories">
        <button
          className="categories__card categories__card--all"
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setFoodFilter(undefined) }
        >
          All
        </button>
        {item.filter((e, index) => index < FIVE)
          .map(({ strCategory }, index) => (
            <button
              className={
                `categories__card categories__card--${strCategory.toLowerCase()}` 
              }
              data-testid={ `${strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ strCategory }
              onClick={ ({ target }) => handleClick(target, 'food') }
            >
              { strCategory }
            </button>
          ))}
      </div>
    );
  }

  if (page === 'drink') {
    return (
      <div className="categories">
        <button
          className="categories__card"
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setFoodFilter(undefined) }
        >
          All
        </button>
        {item.filter((e, index) => index < FIVE)
          .map(({ strCategory }, index) => (
            <button
              className={
                `categories__card categories__card--${strCategory.toLowerCase()}`
              }
              data-testid={ `${strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ strCategory }
              onClick={ ({ target }) => handleClick(target, 'drink') }
            >
              { strCategory }
            </button>
          ))}
      </div>
    );
  }
}

export default MapCategories;
