import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';

function Comidas() {
  const {
    foodData,
    foodCategoriesData,
    arrFiltered,
    setArrFiltered,
    handleClick,
    divClick,
  } = useContext(recipesContext);
  const { push } = useHistory();
  if (!foodData || !foodCategoriesData) {
    return <p>Loading...</p>;
  }
  const TWELVE = 12;
  const FIVE = 5;
  const food = (!arrFiltered) ? foodData : arrFiltered;
  // function divClick(id) {
  //   history.push(`/comidas/${id}`);
  // }
  return (
    <>
      <>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setArrFiltered(foodData) }
        >
          All
        </button>
        {foodCategoriesData.filter((e, index) => index < FIVE)
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
      {food.filter((e, index) => index < TWELVE)
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
    </>
  );
}

export default Comidas;
