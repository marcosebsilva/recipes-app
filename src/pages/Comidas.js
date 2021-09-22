import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';

function Comidas() {
  const { foodData, foodCategoriesData } = useContext(recipesContext);
  const TWELVE = 12;
  const FIVE = 5;
  if (!foodData || !foodCategoriesData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <>
        {foodCategoriesData.filter((e, index) => index < FIVE).map((e, index) => (
          <button
            data-testid={ `${e.strCategory}-category-filter` }
            type="button"
            key={ index }
          >
            { e.strCategory }
          </button>
        ))}
      </>
      {foodData.filter((e, index) => index < TWELVE).map((e, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            src={ e.strMealThumb }
            alt={ e.strMeal }
          />
          <p data-testid={ `${index}-card-name` }>{e.strMeal}</p>
        </div>))}
    </>
  );
}

export default Comidas;
