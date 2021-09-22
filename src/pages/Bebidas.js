import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import MapCategories from '../components/MapCategories';
import MapContent from '../components/MapContent';

function Bebidas() {
  const {
    drinkData,
    drinkCategoriesData,
    arrFiltered,
    setDrinkFilter,
    handleClick,
    divClick,
  } = useContext(recipesContext);

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
          onClick={ () => setDrinkFilter(undefined) }
        >
          All
        </button>
        {MapCategories(drinkCategoriesData, handleClick, 'drink')}
      </>
      {MapContent(drink, divClick, 'drink')}
    </>
  );
}

export default Bebidas;
