import React from 'react';

function MapCategories(item, handleClick, page) {
  const FIVE = 5;

  if (page === 'food') {
    return (
      <>
        {item.filter((e, index) => index < FIVE)
          .map(({ strCategory }, index) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ strCategory }
              onClick={ ({ target }) => handleClick(target, 'food') }
            >
              { strCategory }
            </button>
          ))}
      </>
    );
  }

  if (page === 'drink') {
    return (
      <>
        {item.filter((e, index) => index < FIVE)
          .map(({ strCategory }, index) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ strCategory }
              onClick={ ({ target }) => handleClick(target, 'drink') }
            >
              { strCategory }
            </button>
          ))}
      </>
    );
  }
}

export default MapCategories;
