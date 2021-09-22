import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';

function Bebidas() {
  const { drinkData, drinkCategoriesData } = useContext(recipesContext);
  const TWELVE = 12;
  const FIVE = 5;
  if (!drinkData || !drinkCategoriesData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <>
        {drinkCategoriesData.filter((e, index) => index < FIVE).map((e, index) => (
          <button
            data-testid={ `${e.strCategory}-category-filter` }
            type="button"
            key={ index }
          >
            { e.strCategory }
          </button>
        ))}
      </>
      {drinkData.filter((e, index) => index < TWELVE).map((e, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            src={ e.strDrinkThumb }
            alt={ e.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{e.strDrink}</p>
        </div>))}
    </>
  );
}

export default Bebidas;
