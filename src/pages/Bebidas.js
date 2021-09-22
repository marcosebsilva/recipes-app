import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';

function Bebidas() {
  const {
    drinkData,
    drinkCategoriesData,
    arrFiltered,
    setDrinkFilter,
    setArrFiltered,
  } = useContext(recipesContext);
  const TWELVE = 12;
  const FIVE = 5;
  if (!drinkData || !drinkCategoriesData) {
    return <p>Loading...</p>;
  }
  const drink = (!arrFiltered) ? drinkData : arrFiltered;
  return (
    <>
      <>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setArrFiltered(drinkData) }
        >
          All
        </button>
        {drinkCategoriesData.filter((e, index) => index < FIVE)
          .map(({ strCategory }, index) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ index }
              type="button"
              value={ strCategory }
              onClick={ ({ target }) => setDrinkFilter(target.value) }
            >
              { strCategory }
            </button>
          ))}
      </>
      {drink.filter((e, index) => index < TWELVE)
        .map(({ strDrinkThumb, strDrink }, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
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

export default Bebidas;
