import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import recipesContext from '../context/recipesContext';

function Bebidas() {
  const {
    drinkData,
    drinkCategoriesData,
    arrFiltered,
    setArrFiltered,
    handleClick,
    divClick,
  } = useContext(recipesContext);
  const { push } = useHistory();
  if (!drinkData || !drinkCategoriesData) {
    return <p>Loading...</p>;
  }
  const TWELVE = 12;
  const FIVE = 5;
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
              onClick={ ({ target }) => handleClick(target, 'drink') }
            >
              { strCategory }
            </button>
          ))}
      </>
      {drink.filter((e, index) => index < TWELVE)
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

export default Bebidas;
