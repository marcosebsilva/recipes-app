import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import MapCategories from '../components/MapCategories';
import MapContent from '../components/MapContent';

function Comidas() {
  const {
    foodData,
    foodCategoriesData,
    arrFiltered,
    setFoodFilter,
    handleClick,
    divClick,
  } = useContext(recipesContext);
  const food = (!arrFiltered) ? foodData : arrFiltered;

  if (!foodData || !foodCategoriesData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => setFoodFilter(undefined) }
        >
          All
        </button>
        {MapCategories(foodCategoriesData, handleClick, 'food')}
      </>
      {MapContent(food, divClick, 'food')}
    </>
  );
}

export default Comidas;
